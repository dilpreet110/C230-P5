// Capstone Coding Project Final
// Dilpreet Singh Sidhu
// 3 May,2024 - Start date
//
// Extra for Experts:
// - Brick breaker game was created by me. The project features a ball, a paddle and myriad of Bricks, The purpose of the game is to break bricks using th ball and 
//   not letting the go out of the bottom of the screen using the Paddle. If you break all bricks you win and if you lose all 3 lives you lose. The bricks are filled
//   with challenges and powers. The controls and purpose of bricks are given on the load screen of the game. 


// Variable declarations and initializations
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
let gamePaused = false;
let gameStarted = false;


function setup() {
  createCanvas(windowWidth, windowHeight);
  paddle = new Paddle();
  createBricks();
  balls.push(new Ball());
  noLoop();
}


function draw() {
  background(0);

  if (!gameStarted) {
    drawStartScreen();
  }
  else {
    if (!gamePaused) {
      // Render and move paddle
      paddle.show();
      paddle.move();
      
      // Render and move triple paddles if activated
      if (multiPaddle) {
        for (let p of triplePaddles) {
          p.show();
        }
      }

      // Render and move balls, check collisions with paddle
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
      
      // Render bricks and check collisions with balls
      for (let i = bricks.length - 1; i >= 0; i--) {
        bricks[i].show();
        for (let j = balls.length - 1; j >= 0; j--) {
          if (balls[j].hits(bricks[i])) {
            balls[j].bounce(bricks[i]);
            handleBrickSpecial(bricks[i], balls[j]);
            bricks.splice(i, 1);
            score++;
          }
        }
      }
      
      for (let i = balls.length - 1; i >= 0; i--) {
        if (balls[i].pos.y > height) {
          balls.splice(i, 1);
          loseLife();
        }
      }
      
      // Check if game over or level complete conditions are met
      if (lives === 0) {
        gameOver();
      }
      
      if (bricks.length === 0) {
        levelComplete();
      }
      
      displayHUD();
    }
  }
}

// Function to create initial set of bricks
function createBricks() {
  brickWidth = (width - 2 * brickOffsetLeft) / brickColumnCount - brickPadding;
  brickHeight = height*0.05;
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

// Function to decrement lives when a ball is lost
function loseLife() {
  lives--;
  if (lives > 0) {
    balls = [new Ball()];
  }
}

// Function to handle game over
function gameOver() {
  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER);
  text('Game Over!', width / 2, height / 2);
  textSize(24);
  text('Press R to Restart', width / 2, height / 2 + 40);
  noLoop();
}

// Function to handle level completion
function levelComplete() {
  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER);
  text('Level Complete!', width / 2, height / 2);
  textSize(24);
  text('Press R to Restart', width / 2, height / 2 + 40);
  text('Or Click to Play Again', width / 2, height / 2 + 80);
  noLoop();
}

// Function to restart the game
function restartGame() {
  score = 0;
  lives = 3;
  balls = [new Ball()];
  bricks = [];
  createBricks();
  paddle = new Paddle();
  powerUps = [];
  paddleBlasters = false;
  multiPaddle = false;
  triplePaddles = [];
  blasterCooldown = 0;
  gamePaused = false;
  loop();
}

// Function to activate triple paddle power-up
function activateMultiPaddle() {
  multiPaddle = true;
  triplePaddles = [
    new Paddle(paddle.pos.x - 120),
    new Paddle(paddle.pos.x),
    new Paddle(paddle.pos.x + 120)
  ];
  setTimeout(() => {
    multiPaddle = false;
    triplePaddles = [];
  }, 10000);
}

// Function to handle brick special effects
function handleBrickSpecial(brick, ball) {
  if (brick.special === 'speed') {
    ball.increaseSpeed();
  } else if (brick.special === 'double') {
    balls.push(new Ball(ball.pos.x, ball.pos.y));
  } else if (brick.special === 'passThrough') {
    ball.passThrough = true;
  } else if (brick.special === 'largeBall') {
    ball.increaseSize();
  } else if (brick.special === 'blaster') {
    paddleBlasters = true;
  } else if (brick.special === 'multiPaddle') {
    activateMultiPaddle();
  }
}

// Function to display heads-up display (HUD)
function displayHUD() {
  textSize(20);
  fill(255);
  text(`Score: ${score}`, 40, height/2);
  text(`Lives: ${lives}`, width - 40, height/2);
}

// Function to draw the start screen
function drawStartScreen() {
  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER);
  text('Brick Breaker by Dilpreet', width / 2, height / 2 - 100);
  textSize(24);
  text(' Play ', width / 2, height / 2);
  text('Controls:', width / 2, height / 2 + 60);
  text('Left/Right Arrow: Move Paddle', width / 2, height / 2 + 100);
  text('Up Arrow: Increase Ball Speed', width / 2, height / 2 + 140);
  text('Down Arrow: Decrease Ball Speed', width / 2, height / 2 + 180);
  text('Space: Shoot Blasters', width / 2, height / 2 + 220);
  text('P: Pause/Resume', width / 2, height / 2 + 260);
  text('R: Restart Game', width / 2, height / 2 + 300);
  textSize(20);
  text('Brick Colors:', width / 2, 20);
  text('Orange: Speed Up Ball', width / 2, 40);
  text('Green: Double Ball', width / 2, 60);
  text('Blue: Pass Through', width / 2, 80);
  text('Purple: Large Ball', width / 2, 100);
  text('Yellow: Blasters', width / 2, 120);
  text('Pink: Multi Paddle', width / 2, 140);

  // Play button
  fill(0, 255, 0);
  rect(width / 2 - 50, height / 2 - 20, 100, 40, 5);
  fill(0);
  textSize(24);
  text('Play', width / 2, height / 2);
}

// Mouse pressed function to handle play button click and restart click
function mousePressed() {
  if (!gameStarted) {
    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height / 2 - 20 && mouseY < height / 2 + 20) {
      gameStarted = true;
      loop();
    }
  } else {
    if (bricks.length === 0) {
      restartGame();
    }
  }
}

// Key pressed function to handle pause/resume and restart
function keyPressed() {
  if (key === 'P' || key === 'p') {
    gamePaused = !gamePaused;
    if (gamePaused) {
      noLoop();
    } else {
      loop();
    }
  }
  if (key === 'R' || key === 'r') {
    restartGame();
  }
}

// Class for the paddle object
class Paddle {
  constructor(x = width / 2 - 50) {
    this.width = windowWidth*0.15;
    this.height = height*0.03;
    this.pos = createVector(x, height - this.height - 30);
    this.speed = 10;
  }
  
  // Function to render paddle
  show() {
    fill(255, 255, 255);
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }
  
  // Function to move paddle based on arrow key input
  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.pos.x = constrain(this.pos.x - this.speed, 0, width - this.width);
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.pos.x = constrain(this.pos.x + this.speed, 0, width - this.width);
    }
    
    if (keyIsDown(UP_ARROW)) {
      for (let ball of balls) {
        ball.increaseSpeed();
      }
    } else if (keyIsDown(DOWN_ARROW)) {
      for (let ball of balls) {
        ball.decreaseSpeed();
      }
    }
    
    // Space key to shoot blasters
    if (keyIsDown(32) && paddleBlasters && blasterCooldown <= 0) {
      powerUps.push(new Blaster(this.pos.x + this.width / 2, this.pos.y));
      blasterCooldown = 20;
    }
    
    // Cooldown timer for blasters
    if (blasterCooldown > 0) {
      blasterCooldown--;
    }
  }
}

// Class for the ball object
class Ball {
  constructor(x = width / 2, y = height / 2) {
    this.pos = createVector(x, y);
    this.radius = height*0.0167;
    this.vel = createVector(random(-5, 5), random(-5, -2));
    this.passThrough = false;
  }
  
  // Function to render ball
  show() {
    fill(138, 236, 255);
    ellipse(this.pos.x, this.pos.y, this.radius * 2);
  }
  
  // Function to move ball
  move() {
    this.pos.add(this.vel);
    if (this.pos.x < this.radius || this.pos.x > width - this.radius) {
      this.vel.x *= -1;
    }
    if (this.pos.y < this.radius) {
      this.vel.y *= -1;
    }
  }
  
  // Function to check collision with paddle
  checkCollision(paddle) {
    if (this.pos.y > height - paddle.height - this.radius &&
        this.pos.x > paddle.pos.x &&
        this.pos.x < paddle.pos.x + paddle.width) {
      let angle = map(this.pos.x, paddle.pos.x, paddle.pos.x + paddle.width, -PI / 4, PI / 4);
      this.vel.x = 5 * cos(angle);
      this.vel.y = -5 * sin(angle);
    }
  }
  
  // Function to check collision with brick
  hits(brick) {
    let d = dist(this.pos.x, this.pos.y, brick.pos.x + brick.width / 2, brick.pos.y + brick.height / 2);
    return d < this.radius + brick.width / 2;
  }
  
  // Function to bounce ball off brick
  bounce(brick) {
    if (!this.passThrough) {
      if (this.pos.y < brick.pos.y || this.pos.y > brick.pos.y + brick.height) {
        this.vel.y *= -1;
      } else {
        this.vel.x *= -1;
      }
    }
  }
  
  // Function to increase ball speed
  increaseSpeed() {
    this.vel.mult(1.1);
  }
  
  // Function to decrease ball speed
  decreaseSpeed() {
    this.vel.mult(0.9);
  }
  
  // Function to increase ball size
  increaseSize() {
    this.radius *= 1.5;
  }
}

// Class for the brick object
class Brick {
  constructor(x, y, w, h, special = null) {
    this.pos = createVector(x, y);
    this.width = w;
    this.height = h;
    this.special = special;
  }
  
  // Function to render brick
  show() {
    if (this.special === 'speed') {
      fill(255, 165, 0);
    } else if (this.special === 'double') {
      fill(0, 255, 0);
    } else if (this.special === 'passThrough') {
      fill(0, 0, 255);
    } else if (this.special === 'largeBall') {
      fill(255, 0, 255);
    } else if (this.special === 'blaster') {
      fill(255, 255, 0);
    } else if (this.special === 'multiPaddle') {
      fill(255, 192, 203);
    } else {
      fill(255, 0, 0);
    }
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }
}

// Class for the blaster power-up
class Blaster {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, -5);
    this.radius = 5;
  }
  
  // Function to render blaster
  show() {
    fill(255, 255, 0);
    ellipse(this.pos.x, this.pos.y, this.radius * 2);
    this.move();
  }
  
  // Function to move blaster
  move() {
    this.pos.add(this.vel);
  }
  
  // Function to check collision with bricks
  hits(brick) {
    let d = dist(this.pos.x, this.pos.y, brick.pos.x + brick.width / 2, brick.pos.y + brick.height / 2);
    return d < this.radius + brick.width / 2;
  }
}
