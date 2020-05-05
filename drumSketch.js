
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

// drums sound 
let hh, clap, bass, n1, n2, n3, n4, n5; // container
let hPat, cPat, bPat, n1Pat, n2Pat, n3Pat, n4Pat, n5Pat; // numbers that make beats
let hPhrase, cPhrase, bPhrase, n1Phrase,n2Phrase,n3Phrase,n4Phrase,n5Phrase; // hibat pattern is interpreted
let drums;
let bpmCTRL;
let beatLength;
let cellWidth;
let canv;
let sPat;
let cursorPos;

let rowNum;

let backSound;

let drumW;
let drumH;

let topH = 150;
let leftW = 200;


let wristRY;
let wristRX;
let wristLY;
let wristLX;

async function setup() {
  
  canv = createCanvas(windowWidth, windowHeight);
  canv.mousePressed(canvasPressed);
  beatLength = 32;
  cellWidth = (width-leftW)/beatLength;
  cursorPose = 0;
  
  hh = loadSound("chords/A2.mp3", () => {});
  clap = loadSound("chords/F2.mp3", () => {});
  bass = loadSound("chords/B1.mp3", () => {});

  n1 = loadSound("chords/A1.mp3", () => {});
  n2 = loadSound("chords/C2.mp3", () => {});
  n3 = loadSound("chords/D2.mp3", () => {});
  n4 = loadSound("chords/G2.mp3", () => {});
  n5 = loadSound("chords/Fs2.mp3", () => {});
  
  rowNum = 8;
  const notes = ['C', 'Db', 'F', 'Gb', 'Bb' ,'Ab','Cb'];
  const octaves = [ 3,3.5,4,4.5,5];
  const octave = random(octaves);
  let note = random(notes);
  
  drumW = windowWidth-leftW;
  drumH = windowHeight-topH;
  
  
  hPat =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  cPat =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  bPat =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  n1Pat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  n2Pat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  n3Pat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  n4Pat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  n5Pat = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  sPat = [1, 2, 3, 5, 4, 10, 1, 10, 13, 15, 9, 2, 19, 11, 3, 1,1, 2, 3, 5, 4, 10, 1, 10, 13, 15, 9, 2, 19, 11, 3, 1];
  
  hPhrase = new p5.Phrase('hh', (time)=>{hh.play(time)}, hPat);
  cPhrase = new p5.Phrase('clap',(time)=>{clap.play(time)},  cPat);
  bPhrase = new p5.Phrase('bass',(time)=>{bass.play(time)},  bPat);
  n1Phrase = new p5.Phrase('n1', (time)=>{n1.play(time)}, n1Pat);
  n2Phrase = new p5.Phrase('n2', (time)=>{n2.play(time)}, n2Pat);
  n3Phrase = new p5.Phrase('n3', (time)=>{n3.play(time)}, n3Pat);
  n4Phrase = new p5.Phrase('n4', (time)=>{n4.play(time)}, n4Pat);
  n5Phrase = new p5.Phrase('n5', (time)=>{n5.play(time)}, n5Pat);

  drums = new p5.Part();
  drums.addPhrase(hPhrase);
  drums.addPhrase(cPhrase);
  drums.addPhrase(bPhrase); 
  drums.addPhrase(n1Phrase); 
  drums.addPhrase(n2Phrase); 
  drums.addPhrase(n3Phrase); 
  drums.addPhrase(n4Phrase); 
  drums.addPhrase(n5Phrase); 

  drums.addPhrase('seq', sequence, sPat);
  
  bpmCTRL = createSlider(3, 600, 80, 1);
  bpmCTRL.position(10, 550);
  bpmCTRL.input(() => {drums.setBPM(bpmCTRL.value())})
  drums.setBPM('80');
  
  drawMetrix();
  
  
  
  // video setting

  video = createCapture(VIDEO);
  video.hide();

  //image(video, width - 150, 0, width, height);
  console.log('视频的大小是',video.width,'===',video.width);
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  //video.size(width-topH, height-leftW);
  let options = {
    debug: true
  }
  
  
  // brain = ml5.neuralNetwork(options);
  // const modelInfo = {
  //   model: 'model/model.json',
  //   metadata: 'model/model_meta.json',
  //   weights: 'model/model.weights.bin',
  // };
  // brain.load(modelInfo, brainLoaded);
  
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

  translate(video.width, 0);
  scale(-1, 1);  
  
  /*
  
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
      strokeWeight(1);
      stroke(255);
      fill(255,50);
      //line(a.position.x, a.position.y,b.position.x,b.position.y);            translate(0,-10);
      
      strokeWeight(0.5);
      noFill();
      //square(a.position.x, a.position.y, random(60));
      fill(random(200,255));
      rect(a.position.x, a.position.y, 3,30);
      //bezier(a.position.x, a.position.y,a.position.x + random(50), a.position.y+random(100),b.position.x-random(50),b.position.y -random(100) , b.position.x, b.position.y);
  
  
  }
    
  }
  */
  pop();
  frameRate(30);
  background(0);

  canvasPressedNew();
  
  // draw pose
  if (pose) {
  wristRX = pose.rightWrist.x*2;  
  wristRY = pose.rightWrist.y;

  wristLX = pose.leftWrist.x*2;
  wristLY = pose.leftWrist.y;
    
  fill(255,255,255,random(255));
  ellipse(wristRX,wristRY,50,50);
  ellipse(wristLX,wristLY,50,50);

  }
  

  if(hh.isLoaded() && clap.isLoaded() && bass.isLoaded()){
  if(!drums.isPlaying){
    drums.loop();
  }else{
    drums.stop();
  }}
    
  // draw rect
  fill(255);
  rect(35, iconH+300, 6, 50);

  // title
  textSize(32);
  fill(255);
  text("Resonance & Universe", 50,60);
  
  textSize(12);
  fill(255,80);
  text("Dancing", 50,80);
  text("Following the sound", 50,95);
  
}

// function brainLoaded() {
//   console.log('pose predicting ready!');
//   predictColor();
// }

// function predictColor() {
//   if (pose) {

//     let inputs = [];
//     for (let i = 0; i < pose.keypoints.length; i++) {
//       let x = pose.keypoints[i].position.x;
//       let y = pose.keypoints[i].position.y;
//       inputs.push(x);
//       inputs.push(y);
//     }
//     brain.predict(inputs, gotResult);
//   } else {
//     setTimeout(predictColor, 100);
//   }
// }

// async function gotResult(error, results) {
  
//   //console.log(results);
//   let r = results[0].value;
//   let g = results[1].value;
//   let b = results[2].value;
//   rSlider.value(r);
//   gSlider.value(g);
//   bSlider.value(b);
//   setTimeout(predictColor, 100);
  
//   if(isStart == 0) {
  
//     if(r>150){
//     if (synthDelay) synthDelay.triggerAttack(random(notes));
//     isStart =1;
//     synthDelay.triggerRelease();

//     await delay(400);
//     isStart =0;
//   }
//   }
// }

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
      
  if(hh.isLoaded() && clap.isLoaded() && bass.isLoaded()){
  if(!drums.isPlaying){
      drums.loop();
  }}
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



// drums setting

function keyPressed() {
  if(key ===" "){
    if(hh.isLoaded() && clap.isLoaded() && bass.isLoaded()){
    if(!drums.isPlaying){
      drums.loop();
    }else{
      drums.stop();
    }
  }else{
    consle.log("drums is not loaded");
  }
}
}

function canvasPressedNew(){
  
  
  let rowClicked = floor(rowNum*(wristRY -topH)/(height - topH));
  let indexClicked = floor(32*(wristRX - leftW)/(width - leftW));

  
  if(rowClicked === 0){
    hPat[indexClicked] = +!hPat[indexClicked];
    console.log(indexClicked)
  }else if(rowClicked === 1){
    cPat[indexClicked] = +!cPat[indexClicked];
  }else if(rowClicked === 2){
    bPat[indexClicked] = +!bPat[indexClicked];
    
  }else if(rowClicked === 3){
    n1Pat[indexClicked] = +!n1Pat[indexClicked];
    
  }else if(rowClicked === 4){
    n2Pat[indexClicked] = +!n2Pat[indexClicked];
    
  }else if(rowClicked === 5){
    n3Pat[indexClicked] = +!n3Pat[indexClicked];  
  }else if(rowClicked === 6){
    n4Pat[indexClicked] = +!n4Pat[indexClicked];
    
  }else if(rowClicked === 7){
    n5Pat[indexClicked] = +!n5Pat[indexClicked];  
  }
  
  
  let rowClicked2 = floor(rowNum*(wristLY -topH)/(height - topH));
  let indexClicked2 = floor(32*(wristLX - leftW)/(width - leftW));
  
    if(rowClicked2 === 0){
    hPat[indexClicked2] = +!hPat[indexClicked2];
  }else if(rowClicked2 === 1){
    cPat[indexClicked2] = +!cPat[indexClicked2];
  }else if(rowClicked2 === 2){
    bPat[indexClicked2] = +!bPat[indexClicked2];
    
  }else if(rowClicked2 === 3){
    n1Pat[indexClicked2] = +!n1Pat[indexClicked2];
    
  }else if(rowClicked2 === 4){
    n2Pat[indexClicked2] = +!n2Pat[indexClicked2];
    
  }else if(rowClicked2 === 5){
    n3Pat[indexClicked2] = +!n3Pat[indexClicked2];  
  }else if(rowClicked2 === 6){
    n4Pat[indexClicked2] = +!n4Pat[indexClicked2];
    
  }else if(rowClicked2 === 7){
    n5Pat[indexClicked2] = +!n5Pat[indexClicked2];  
  }
  
  drawMetrix();
}


function canvasPressed(){
  

  let rowClicked = floor(rowNum*(mouseY -topH)/(height - topH));
  let indexClicked = floor(32*(mouseX - leftW)/(width - leftW));
  
  if(rowClicked === 0){
    hPat[indexClicked] = +!hPat[indexClicked];
    console.log(indexClicked)
  }else if(rowClicked === 1){
    cPat[indexClicked] = +!cPat[indexClicked];
  }else if(rowClicked === 2){
    bPat[indexClicked] = +!bPat[indexClicked];
    
  }else if(rowClicked === 3){
    n1Pat[indexClicked] = +!n1Pat[indexClicked];
    
  }else if(rowClicked === 4){
    n2Pat[indexClicked] = +!n2Pat[indexClicked];
    
  }else if(rowClicked === 5){
    n3Pat[indexClicked] = +!n3Pat[indexClicked];  
  }else if(rowClicked === 6){
    n4Pat[indexClicked] = +!n4Pat[indexClicked];
    
  }else if(rowClicked === 7){
    n5Pat[indexClicked] = +!n5Pat[indexClicked];  
  }
  drawMetrix();
}


function drawMetrix(){
  

  
  stroke('white');
  strokeWeight(0.3);
  fill('white');
  /*
  for(let i =0; i<beatLength; i++){
    // startx, starty, endx, eny
    line(i*cellWidth +leftW, topH, i*cellWidth + leftW, height);
  }
  for(let i=0; i<rowNum; i++){
    line(leftW,i*drumH/rowNum +topH, width, i*drumH/rowNum +topH);
  }
  */
  noStroke();
  stroke('white');
  strokeWeight(0.5);
  
  for(let i =0; i< beatLength; i++){
    
    if(hPat[i]==1){
    fill('white');
    ellipse(i*cellWidth + 0.5*cellWidth + leftW,drumH/(rowNum*2)+topH,10);
    }else{
    noFill();
    ellipse(i*cellWidth + 0.5*cellWidth+ leftW,drumH/(rowNum*2)+topH,10);
    }
    
    if(cPat[i]==1){
    fill('white');
    ellipse(i*cellWidth + 0.5*cellWidth+ leftW,(drumH*3)/(rowNum*2)+topH,10);
    }else{
    noFill();
    ellipse(i*cellWidth + 0.5*cellWidth+ leftW,(drumH*3)/(rowNum*2)+topH,10);
    }
    
    if(bPat[i]==1){
    fill('white');
    ellipse(i*cellWidth + 0.5*cellWidth+ leftW,(drumH*5)/(rowNum*2)+topH,10);
    }else{
    noFill();
    ellipse(i*cellWidth + 0.5*cellWidth+ leftW,(drumH*5)/(rowNum*2)+topH,10);
    }
    
    if(n1Pat[i]==1){
    fill('white');
    ellipse(i*cellWidth + 0.5*cellWidth+ leftW,(drumH*7)/(rowNum*2)+topH,10);
    }else{
    noFill();
    ellipse(i*cellWidth + 0.5*cellWidth+ leftW,(drumH*7)/(rowNum*2)+topH,10);
    }
    
    if(n2Pat[i]==1){
    fill('white');
    ellipse(i*cellWidth + 0.5*cellWidth+ leftW,(drumH*9)/(rowNum*2)+topH,10);
    }else{
    noFill();
    ellipse(i*cellWidth + 0.5*cellWidth+ leftW,(drumH*9)/(rowNum*2)+topH,10);
    }
      
    if(n3Pat[i]==1){
    fill('white');
    ellipse(i*cellWidth + 0.5*cellWidth+ leftW,(drumH*11)/(rowNum*2)+topH,10);
    }else{
    noFill();
    ellipse(i*cellWidth + 0.5*cellWidth+ leftW,(drumH*11)/(rowNum*2)+topH,10);
    }
    
    if(n4Pat[i]==1){
    fill('white');
    ellipse(i*cellWidth + 0.5*cellWidth+ leftW,(drumH*13)/(rowNum*2)+topH,10);
    }else{
    noFill();
    ellipse(i*cellWidth + 0.5*cellWidth+ leftW,(drumH*13)/(rowNum*2)+topH,10);
    }
    
    if(n5Pat[i]==1){
    fill('white');
    ellipse(i*cellWidth + 0.5*cellWidth+ leftW,(drumH*15)/(rowNum*2)+topH,10);
    }else{
    noFill();
    ellipse(i*cellWidth + 0.5*cellWidth+ leftW,(drumH*15)/(rowNum*2)+topH,10);
    }
  }
}

function sequence(time, beatIndex){
  setTimeout(()=>{}, time*1000);
  drawMetrix();
  //drawPlayhead(beatIndex);
}

// function drawPlayhead(beatIndex){
//   stroke('white');
//   fill(255, 20);
//   rect((beatIndex-1)*cellWidth+leftW, 0+topH, cellWidth, drumH);
// }

function linePageClicked(){
    window.location.href="index.html"

}

function gesturePageClicked(){
    window.location.href="gesturepage.html"

}

function drumPageClicked(){
    window.location.href="drumpage.html"

}