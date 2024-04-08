// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let rectWidth = 50 , rectHeight = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  drawRGB(width*0.1);
}

function drawHSB(x){
  colorMode(HSB);
  for(let y = 0;y < height ; y+=rectHeight){
    fill(random(255),random(255),random(255));
    rect(x,y,rectWidth,rectHeight);
  }
}

function drawRGB(x){
  colorMode(RGB);
  for(let y = 0;y < height ; y+=rectHeight){
    fill(random(255),random(255),random(255));
    rect(x,y,rectWidth,rectHeight);
  }
}