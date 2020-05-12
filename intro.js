function setup() {
  
  createCanvas(windowWidth, windowHeight);
  
  background(0);

  rectMode(CENTER);
  
  textSize(30);
  fill(255);
  let t = 'Renosance with universe';
  let tWith = textWidth(t);
  text(t,(width-tWith)/2,100);
  
  
  textSize(10);
  fill(255,200);

  let t1 = 'This is a sound website that can interact with body movements. Please keep a little distance with your camera, and try to move your body. ';
  let t11 = 'You can chose a planet sound as background sound, and make a resonance with universe. There are three trigger types seperately base on your position, gesture and path.';
  let t1With = textWidth(t1);
  let t11With = textWidth(t11);

  text(t1,(width-t1With)/2,(height-100)/2-130);
  text(t11,(width-t11With)/2,(height-100)/2-110);

  textSize(16);
  fill(255);
  let t2 = 'Keep a distance with your camera';
  let t3 = 'Move your body'
  let t2With = textWidth(t2);
  let t3With = textWidth(t3);

  text(t2,(width-t2With)/2,(height-100)/2 + 150);
  text(t3,(width-t3With)/2,(height-100)/2 + 175);
  
  imageButton = createImg('back.png');
  imageButton.position((width-100)/2,(height-100)/2,0);
  imageButton.size(100,100);
  
  var button = createButton('Start');
  
  let col = color(0);
  let tcol = color(255);

  button.style('background-color', col);
  button.style('color', tcol);

  var W = 150;
  var H = 40;
  button.size(W,H);
  button.position((width-W)/2, height-120);
  button.mousePressed(jumpToIndex);
  
}

function draw() {
}

function jumpToIndex(){
    window.location.href="index.html"
}