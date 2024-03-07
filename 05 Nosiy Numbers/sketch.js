// Noisy Numbers
// Dilpreet
// 3/7/2024
//
// A look at randomnsess:
// "

let segmentLength = 20;
let ballY = 200; let ySpeed;
let ballTime = 10;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function segmentLine(){
  strokeWeight(15);
  let greyTime = 0;

  let x = 0;
  while(x<width){ 
    let greyValue = random (0,255);


    greyValue = noise(greyTime);
    greyValue = map(greyValue,0,1,0,255);
    greyTime  += 0.1;


    stroke(greyValue);
    line(x,height/2,x+segmentLength,height/2);
    x +=segmentLength;
  }
}

function moveBall(){
  strokeWeight(1); stroke(0);
  ySpeed = random(-20,20);

  ballY += ySpeed;
  circle(width*0.7,-10,30);
  
}

function draw() {
  background(220);
  segmentLine();
  moveBall();

}
