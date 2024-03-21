// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  drawStaticClock();
  drawClockHands();
}

function drawStaticClock(){
  stroke(0);
  translate(width/2,height/2);
  push();
  circle(0,0 ,300);


  let count = 0; let angle = 6;

  while (count<60){
    if (count % 5 === 0){
      strokeWeight(3);
      line(110,0,140,0);
    }
    else{
      strokeWeight(1);
      line(125,0,140,0);
    }
    line(110,0,140,0);
    rotate(angle);
    count ++;
  }
  pop();
}

function drawClockHands(){
  push();
  rotate(second()*6);
  line(0,0,0,130);
  pop();

  push();
  strokeWeight(3);
  rotate(minute()*6);
  line(0,0,0,70);
  pop();
}