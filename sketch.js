
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

async function setup() {
  
  createCanvas(windowWidth, windowHeight);
  background(0);

  rSlider = createSlider(0, 255, 0);
  gSlider = createSlider(0, 255, 0);
  bSlider = createSlider(0, 255, 0);

  video = createCapture(VIDEO);
  video.hide();
  translate(video.width, 0);
  scale(-1, 1);
  
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

  let options = {
    debug: true
  }
  
  
  brain = ml5.neuralNetwork(options);
  const modelInfo = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin',
  };
  brain.load(modelInfo, brainLoaded);

  // normal sound setting
  Tone.Master.volume.value = -2;

  synth = new Tone.Synth({
    oscillator : {
      type: 'sine'
    }
  });

  var feedbackDelay = new Tone.FeedbackDelay('8n',  0.6);
  synth.connect(feedbackDelay);
  synth.connect(Tone.Master);
  feedbackDelay.connect(Tone.Master);
  
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
  
  
}

function draw() {
  
  
  push();

  //image(video, width - 150, 0, 100, 80);
  background(0,15);
  
        
  // draw rect
  fill(255);
  rect(35, iconH+100, 6, 50);
  
  // title
  textSize(32);
  fill(255);
  text("Resonance & Universe", 50,60);
  
  textSize(12);
  fill(255,80);
  text("Dancing", 50,80);
  text("Following the sound", 50,95);

  
  strokeWeight(0.5);
  stroke(255,255,255);
  noFill()
  
  // draw circle 
  let radius = 80;
  while(radius<(width*0.5))
  {
      circle(width/2, height/2,radius);
      radius = radius+50;
  }
  
  // draw pose
  if (pose) {
       
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      
      strokeWeight(3);
      stroke(255,255,255);
      //fill(0);
      noFill()

      //fill(random(255),random(255),random(255),255);
      bezier(a.position.x*1.2+250, a.position.y*1.2,a.position.x*1.2 + random(50)+250, a.position.y*1.2+random(50),b.position.x*1.2+random(50)+250,b.position.x*1.2 +random(50) , b.position.x*1.2+250, b.position.y*1.2);
      
      //ellipse(a.position.x, a.position.y, 16, 16);
      //line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
    
    let wristR = pose.rightWrist.x;
    let wristL = pose.leftWrist.x;
    
    
    // pattern one 

    if((wristR<500 && wristR>495) || (wristL<500 && wristL>490)){
        const note = random(["A3", "A3"]); 
        synth.triggerAttackRelease(note , '8n');
      
    }else if((wristR<450 && wristR>445) || (wristL<400 && wristL>390)){
        const note =random(["B2", "B2"]); 
        synth.triggerAttackRelease(note , '8n');

    }else if((wristR<400 && wristR>395) || (wristL<400 && wristL>390)){
        const note =random(["C4", "C4"]); 
        synth.triggerAttackRelease(note , '8n');

    }else if((wristR<350 && wristR>345) || (wristL<400 && wristL>390)){
        const note =random(["C2", "C2"]); 
        synth.triggerAttackRelease(note , '8n');

    }else if((wristR<300 && wristR>295) || (wristL<300 && wristL>290)){
        const note =random(["D4", "D4"]); 
        synth.triggerAttackRelease(note , '8n');

    }else if((wristR<200 && wristR>195) || (wristL<200 && wristL>190)){
        const note =random(["E3", "E3"]); 
        synth.triggerAttackRelease(note , '8n');

    }else if((wristR<100 && wristR>95) || (wristL<100 && wristL>90)){
        const note =random(["G4", "G4"]); 
        synth.triggerAttackRelease(note , '8n');
    }

    
  }
  pop();

  let r = rSlider.value();
  let g = gSlider.value();
  let b = bSlider.value();
  //background(r, g, b, 100);

  frameRate(10);
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
    brain.predict(inputs, gotResult);
  } else {
    setTimeout(predictColor, 100);
  }
}

async function gotResult(error, results) {
  
  //console.log(results);
  let r = results[0].value;
  let g = results[1].value;
  let b = results[2].value;
  rSlider.value(r);
  gSlider.value(g);
  bSlider.value(b);
  predictColor();
  
//   if(isStart == 0) {
//   if(r>150){
//     if (synthDelay) synthDelay.triggerAttack(random(notes));
//     isStart =1;
//     synthDelay.triggerRelease();

//     await delay(400);
//     isStart =0;
//   }
//   }
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

  const note = random(["A3", "C4", "D4", "E3", "G4"]);
  synth.triggerAttackRelease(note , '8n');
  
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
    
    let posY = 70;
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