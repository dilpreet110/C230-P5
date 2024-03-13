// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rectWidth = 10;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  rectMode(CENTER);
  drawRectangles();
}

function drawRectangles(){
  let rectHeight;
  fill(0);
  for(let x = 0;x<width;x+=rectWidth){

    let Timex =  0;let a;
    a = noise(Timex);
    a = map(a,0,1,height*0.2,height*0.8);
    Timex += 0.1;

    rectWidth += Timex;
    
    rectHeight = (0,height*8);
    rect(x,height,rectWidth,rectHeight);
  }

}

function draw() {
}
