// Capstone Coding Project Final
// Dilpreet Singh Sidhu
// 3 May,2024 - Start date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let BG;
let paddle; 
let balls = [];
let bricks = [];

function preload(){
  BG = loadImage("assets/BG.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
}

class Paddle {
  constructor(){
    this.width = windowWidth*0.1;
    this.height = windowHeight*0.1;
    this.pos = createVector(width/2 - this.width/2, height - this.height - 10);
    this.speed = 10;
  }

  show(){
    fill(138,236,255);
    rect(this.pos.x , this.pos.y , this.width, this.height);  // come to it later
  }

  move(){
    if(keyIsDown(LEFT_ARROW)){
      this.pos.x = constrain(this.pos.x - this.speed, 0 , width - this.width);
    }
    else if(keyIsDown(RIGHT_ARROW)){
      this.pos.x = constrain(this.pos.x + this.speed, 0 , width - this.width);
    }
  }                 // Up and Down arrows for ball speed later and this.pos.y

}
