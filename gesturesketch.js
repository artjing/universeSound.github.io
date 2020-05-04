
let video;
let poseNet;
let pose;
let skeleton;
let result;
let brain;

// UI
let rSlider, gSlider, bSlider;

let imageButton;
let linePattern;
let guestPattern;
let drumsPatterm;

let isPlanetClicked;

let mars;
let jupiter;
let saturn;
let uranus;
let neptune;
let sun;

var player;
let selectedRect;

let iconH;

//delay sound
let    ready = false;
let    synthDelay;
const  type = 'square';
const  volume = -1;
let    filter, effect;
const  filterMin = 100;
const  filterMax = 8000;

let fxU = 0.5;
let fxV = 0.5;
const notes = [ 'C5', 'A3', 'D4', 'G4', 'A4', 'F4' ];
let isStart;

let posePattern;
let lastPosePattern;
async function setup() {
  
  createCanvas(windowWidth, windowHeight);
  background(0);

  rSlider = createSlider(0, 255, 0);
  gSlider = createSlider(0, 255, 0);
  bSlider = createSlider(0, 255, 0);

  video = createCapture(VIDEO);
  video.hide();
  
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

  let options = {
    inputs: 34,
    outputs: 4,
    task: 'classification',
    debug: true
  }
  
  brain = ml5.neuralNetwork(options);
  const modelInfo = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin',
  };
  brain.load(modelInfo, brainLoaded);
  
  // sequences sound setting
  isPlanetClicked = 1;
  
  
  // set up images
  iconH = 150;
  imageButton = createImg('images/sleButton3.png');
  imageButton.position(50,iconH);
  imageButton.size(50,50);
  imageButton.mousePressed(planetClicked);
 
  linePattern = createImg('images/lines.png');
  linePattern.position(50,iconH+100);
  linePattern.size(50,50);
  linePattern.mousePressed(linePageClicked);

  
  gesturePattern = createImg('images/gesture.png');
  gesturePattern.position(50,iconH+200);
  gesturePattern.size(50,50);
  gesturePattern.mousePressed(gesturePageClicked);

  
  drumsPattern = createImg('images/drums.png');
  drumsPattern.position(50,iconH+300);
  drumsPattern.size(50,50);
  drumsPattern.mousePressed(drumPageClicked);
  
  // set up music button
  jupiter = createImg('images/jupiter.png');
  jupiter.position(-200,-200);
  jupiter.size(50,50);
  jupiter.mousePressed(jupiterClicked);
  
    
  saturn = createImg('images/saturn.png');
  saturn.position(-100,-100);
  saturn.size(50,50);
  saturn.mousePressed(saturnClicked);
  

  
  uranus = createImg('images/Uranus.png');
  uranus.position(-100,-100);
  uranus.size(50,50);
  uranus.mousePressed(uranusClicked);
  
  
  neptune = createImg('images/neptune.png');
  neptune.position(-100,-100);
  neptune.size(50,50);
  neptune.mousePressed(neptuneClicked);
  
  sun = createImg('images/sun.png');
  sun.position(-100,-100);
  sun.size(50,50);
  sun.mousePressed(sunClicked);

          
  mars = createImg('images/mars.png');
  mars.position(-100,-100);
  mars.size(50,50);
  mars.mousePressed(marsClicked);
  
  
  // delay soudn setting
  isStart = 0;
  Tone.Master.volume.value = volume;
  const reverb = new Tone.Reverb({
    decay: 5,
    wet: 0.5,
    preDelay: 0.2
  });

  await reverb.generate();
  effect = new Tone.FeedbackDelay(0.4, 0.85);

  filter = new Tone.Filter();
  filter.type = 'lowpass';
  
  synthDelay = new Tone.Synth({
    "oscillator" : {
      "type" : `fat${type}`,
      "count" : 3,
      "spread" : 30
    },
    "envelope": {
      "attack": 0.001,
      "decay": 0.1,
      "sustain": 0.5,
      "release": 0.1,
      "attackCurve" : "exponential"
    }
  });
  synthDelay.connect(filter);  
  filter.connect(effect);
  effect.connect(reverb);
  reverb.connect(Tone.Master);
  ready = true;
  
}

function draw() {
  
  
  push();
  
  translate(video.width, 0);
  scale(-1, 1);
  
  //image(video, width - 150, 0, 100, 80);
  background(0);
  
        
  // draw rect
  fill(255);
  rect(35, iconH+200, 6, 50);
  
  // title
  textSize(32);
  fill(255);
  text("Resonance & Universe", 50,60);
  
  textSize(12);
  fill(255,80);
  text("Dancing", 50,80);
  text("Following the sound", 50,95);


  //noFill()
  
  // draw pose
  if (pose) {

  for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(255,255,255,random(255));
      //ellipse(x,y,random(50),random(50));
      rect(x, y, random(12), random(100));
  }
    
for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(5);
      stroke(255);
      fill(255,50);
      line(a.position.x, a.position.y,b.position.x,b.position.y);            translate(0,-10);
      
      strokeWeight(0.5);
      noFill();
      //square(a.position.x, a.position.y, random(60));
      fill(random(200,255));
      rect(a.position.x, a.position.y, 3,30);
      //bezier(a.position.x, a.position.y,a.position.x + random(50), a.position.y+random(100),b.position.x-random(50),b.position.y -random(100) , b.position.x, b.position.y);
  
  
  }

    let wristR = pose.rightWrist.x;
    let wristL = pose.leftWrist.x;
    
  }
  pop();

  let r = rSlider.value();
  let g = gSlider.value();
  let b = bSlider.value();
  //background(r, g, b, 100);

  // delay soudn
  // filter.frequency.value = lerp(filterMin, filterMax, fxU);
  // effect.wet.value = fxV;  
}

function brainLoaded() {
  console.log('pose predicting ready!');
  predictColor();
}

function predictColor() {
  if (pose) {
    let inputs = [];
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.classify(inputs, gotResult);
  } else {
    setTimeout(predictColor, 100);
  }
}

async function gotResult(error, results) {
  
  console.log('getResult===');

  if (results[0].confidence > 0.75) {
    poseLabel = results[0].label.toUpperCase();
  }
  console.log(poseLabel);
  
  predictColor();
  
  posePattern = poseLabel;
  if(lastPosePattern == posePattern) {
  }else{
    if (synthDelay) synthDelay.triggerAttack(random(notes));
    isStart =1;
    synthDelay.triggerRelease();

    await delay(400);
    isStart =0;
  }
  lastPosePattern = poseLabel;
}

function gotPoses(poses) {
  // console.log(poses); 
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}


function modelLoaded() {
  console.log('poseNet ready');
}


function freqFromMouse(x, y) {
  return map(x, 0, width - 1, freq2 * 0.9, freq2 * 1.1);
}

 function mousePressed () {
  
}

function delay(time) {
  return new Promise((resolve, reject) => {
    if (isNaN(time)) {
      reject(new Error('delay requires a valid number.'));
    } else {
      setTimeout(resolve, time);
    }
  });
}

function planetClicked(){
  
  if(isPlanetClicked == 1){
    
    let posY = iconH;
    mars.position(50+50+20,posY);
    jupiter.position(50+100+40,posY);
    saturn.position(50+150+60,posY);
    uranus.position(50+200+80, posY);
    neptune.position(50+250+100, posY);
    sun.position(50+300+120, posY);
    isPlanetClicked = 0;
  }else{
    mars.position(-200,-200);
    jupiter.position(-200,-200);
    saturn.position(-200,-200);
    uranus.position(-200,-200);
    neptune.position(-200,-200);
    sun.position(-200,-200);
    
    isPlanetClicked = 1;
  }
}

function jupiterClicked()
{
  soundisClicked();
  player = new        
  Tone.Player("sound/jupite.m4a").toMaster();
  player.volume.value = 2;
  player.autostart = true;
}

function saturnClicked()
{
  soundisClicked();
  player = new        
  Tone.Player("sound/saturn.m4a").toMaster();
  player.volume.value = 2;
  player.autostart = true;
}

function uranusClicked()
{
  
  soundisClicked();
  player = new        
  Tone.Player("sound/uranus.m4a").toMaster();
  player.volume.value = 2;
  player.autostart = true;
}

function sunClicked()
{
  soundisClicked();
  player = new        
  Tone.Player("sound/sun.m4a").toMaster();
  player.volume.value = 2;
  player.autostart = true;
}

function neptuneClicked()
{
  soundisClicked();
  player = new        
  Tone.Player("sound/Neptune.m4a").toMaster();
  player.volume.value = 2;
  player.autostart = true;
}

function marsClicked()
{
  soundisClicked();
  player = new        
  Tone.Player("sound/mars.m4a").toMaster();
  player.volume.value = 2;
  player.autostart = true;
}

function soundisClicked(){
  
  isPlanetClicked = 0;
  planetClicked();
}

function linePageClicked(){
    window.location.href="index.html"

}

function gesturePageClicked(){
    window.location.href="gesturepage.html"

}

function drumPageClicked(){
    window.location.href="drumpage.html"

}
