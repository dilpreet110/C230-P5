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
let brickWidth, brickHeight;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let score = 0;
let lives = 3;
let powerUps = [];
let paddleBlasters = false;
let multiPaddle = false;
let triplePaddles = [];
let blasterCooldown = 0;


// work needed in draw() column;

function setup() {
  createCanvas(windowWidth, windowHeight);
  paddle = new Paddle();
  createBricks();
  balls.push(new Ball());
}

function draw() {
  background(0);

  paddle.show();
  paddle.move();

  if (multiPaddle) {
    for (let p of triplePaddles) {
      p.show();
    }
  }

  for (let ball of balls) {
    ball.show();
    ball.move();
    ball.checkCollision(paddle);
    if (multiPaddle) {
      for (let p of triplePaddles) {
        ball.checkCollision(p);
      }
    }
  }
}

function createBricks() {
  brickWidth = (width - 2 * brickOffsetLeft) / brickColumnCount - brickPadding;
  brickHeight = 30;
  for (let i = 0; i < brickColumnCount; i++) {
    for (let j = 0; j < brickRowCount; j++) {
      let x = i * (brickWidth + brickPadding) + brickOffsetLeft;
      let y = j * (brickHeight + brickPadding) + brickOffsetTop;
      let special = random() > 0.9 ? (random() > 0.5 ? 'speed' : 'double') : null;
      let chance = random();
      if (chance > 0.95) {
        special = 'passThrough';
      } else if (chance > 0.9) {
        special = 'largeBall';
      } else if (chance > 0.85) {
        special = 'blaster';
      } else if (chance > 0.8) {
        special = 'multiPaddle';
      }
      bricks.push(new Brick(x, y, brickWidth, brickHeight, special));
    }
  }
}

function loseLife() {
  lives--;
  balls = [new Ball()];
}

function gameOver() {
  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER);
  text('Game Over!', width / 2, height / 2);
  noLoop();
}

class Paddle {
  constructor(x = width / 2 - 50) {
    this.width = windowWidth*0.15;
    this.height = 20;
    this.pos = createVector(x, height - this.height - 10);
    this.speed = 10;
  }
  
 
  show() {
    fill(138, 236, 255);
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }
  

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.pos.x = constrain(this.pos.x - this.speed, 0, width - this.width);
    } 
    else if (keyIsDown(RIGHT_ARROW)) {
      this.pos.x = constrain(this.pos.x + this.speed, 0, width - this.width);
    }
    
    if (keyIsDown(UP_ARROW)) {
      for (let ball of balls) {
        ball.increaseSpeed();
      }
    }
    else if (keyIsDown(DOWN_ARROW)) {
      for (let ball of balls) {
        ball.decreaseSpeed();
      }
    }
    
    if (paddleBlasters && keyIsDown(32) && blasterCooldown <= 0) { 
      powerUps.push(new Blaster(this.pos.x + this.width / 2, this.pos.y));
      blasterCooldown = 20; 
    }
    
    if (blasterCooldown > 0) {
      blasterCooldown--;
    }
  }
}

class Ball{
  constructor(x = width / 2, y = height / 2) {
    this.pos = createVector(x, y);
    this.radius = 10;
    this.vel = createVector(random(-5, 5), random(-5, -2));
    this.passThrough = false;
  }
  

  show() {
    fill(138, 236, 255);
    ellipse(this.pos.x, this.pos.y, this.radius * 2);
  }
  

  move() {
    this.pos.add(this.vel);
    if (this.pos.x < this.radius || this.pos.x > width - this.radius) {
      this.vel.x *= -1;
    }
    if (this.pos.y < this.radius) {
      this.vel.y *= -1;
    }
  }
  
 
  checkCollision(paddle) {
    if (this.pos.y > height - paddle.height - this.radius &&
        this.pos.x > paddle.pos.x &&
        this.pos.x < paddle.pos.x + paddle.width) {
      let angle = map(this.pos.x, paddle.pos.x, paddle.pos.x + paddle.width, -PI / 4, PI / 4);
      this.vel.x = 5 * cos(angle);
      this.vel.y = -5 * sin(angle);
    }
  }
  

  hits(brick) {
    let d = dist(this.pos.x, this.pos.y, brick.pos.x + brick.width / 2, brick.pos.y + brick.height / 2);
    return d < this.radius + brick.width / 2;
  }  
  

  bounce(brick) {
    if (!this.passThrough) {
      if (this.pos.y < brick.pos.y || this.pos.y > brick.pos.y + brick.height) {
        this.vel.y *= -1;
      } 
      else {
        this.vel.x *= -1;
      }
    }
  }
  
  increaseSpeed() {
    this.vel.mult(1.1);
  }
  

  decreaseSpeed() {
    this.vel.mult(0.9);
  }
  

  increaseSize() {
    this.radius *= 1.5;
  }
}

class Brick {
  constructor(x, y, w, h, special = null) {
    this.pos = createVector(x, y);
    this.width = w;
    this.height = h;
    this.special = special;
  }
  
  show() {
    if (this.special === 'speed') {
      fill(255, 165, 0);
    } 
    else if (this.special === 'double') {
      fill(0, 255, 0);
    }
    else if (this.special === 'passThrough') {
      fill(0, 0, 255);
    } 
    else if (this.special === 'largeBall') {
      fill(255, 0, 255);
    } 
    else if (this.special === 'blaster') {
      fill(255, 255, 0);
    } 
    else if (this.special === 'multiPaddle') {
      fill(255, 192, 203);
    }
    else {
      fill(255, 0, 0);
    }
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }
}

class Blaster{
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, -5);
    this.radius = 5;
  }

  show() {
    fill(255, 255, 0);
    ellipse(this.pos.x, this.pos.y, this.radius * 2);
    this.move();
  }
  
  move() {
    this.pos.add(this.vel);
  }

  hits(brick) {
    let d = dist(this.pos.x, this.pos.y, brick.pos.x + brick.width / 2, brick.pos.y + brick.height / 2);
    return d < this.radius + brick.width / 2;
  }
}

