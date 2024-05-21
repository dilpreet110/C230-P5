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
let brickRowCount = 6;
let brickColumnCount = 8;
let brickWidth , brickHeight;
let brickPadding = 10;
//more variables will come here

function preload(){
  BG = loadImage("assets/BG.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
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
    rect(this.pos.x , this.pos.y , this.width, this.height);
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

class Ball{
  constructor(x = width/2 , y = height/2){
    this.pos = createVector(x,y);
    this.radius = 10;
    this.vel = createVector(random(-5,5),(-5,-2));
  }

  show(){
    fill(255);
    ellipse(this.pos.x,this.pos.y,this.radius*2);
  }

  move(){
    this.pos.add(this.vel);
    if(this.pos.x < this.radius || this.pos.x > width - this.radius){
      this.vel.x *= -1;
    }

    if(this.pos.y < this.radius){
      this.vel.y *= -1;
    }
  }

  checkCollision(paddle){
    if(this.pos.y > height - paddle.height - this.radius && this.pos.x > paddle.pos.x && this.pos.x < paddle.pos.x + paddle.width){
      let angle = map(this.pos.x, paddle.pos.x, paddle.pos.x + paddle.width, -PI/4 , PI/4);
      this.vel.x = 5*cos(angle);
      this.vel.y = -5*sin(angle);
    }
  }

  hits(brick){
    let d = dist(this.pos.x , this.pos.y , brick.pos.x + brick.width/2 , brick.pos.y + brick.height/2);
    return d < this.radius + brick.width / 2;
  }                                         
}
