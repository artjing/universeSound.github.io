function setup() {
  
  createCanvas(windowWidth, windowHeight);
  
  background(0);

  rectMode(CENTER);
  
  textSize(38);
  fill(255);
  let t = 'Renosance with universe';
  let tWith = textWidth(t);
  text(t,(width-tWith)/2,100);
  
  imageButton = createImg('back.png');
  imageButton.position((width-280)/2,(height-280)/2,0);
  imageButton.size(280,280);
  
  var button = createButton('Start');
  
  let col = color(0);
  let tcol = color(255);

  button.style('background-color', col);
  button.style('color', tcol);

  var W = 150;
  var H = 30;
  button.size(W,H);
  button.position((width-W)/2, height-100);
  button.mousePressed(jumpToIndex);
  
}

function draw() {
}

function jumpToIndex(){
    window.location.href="index.html"
}