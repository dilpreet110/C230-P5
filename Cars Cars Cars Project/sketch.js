// Cars Cars Cars
// Dilpreet 
// 18 April, 2024
//
// Extra for Experts:
// We will use functions like mouse pressed, setup , draw to define arrays and we will pouplate arrays with class functions.


let eastbound = [];
let westbound = [];
let roadWidth = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Populate eastbound and westbound array
  for (let i = 0; i < 20; i++) {
    let yPos = random(100, height/2 - 20);
    eastbound.push(new Vehicle(Math.round(random(0,1)), color(255, 0, 0), random(width), yPos, 1, random(3, 15)));
  }
  
  for (let i = 0; i < 20; i++) {
    let yPos = random(height/2 + 20, height - 140 );
    westbound.push(new Vehicle(Math.round(random(0,1)), color(0, 0, 255), random(width), yPos, 0, random(-15, -3)));
  }
}

function draw() {
  background(220);
  drawRoad();
  
  // Process eastbound and westbound vehicles
  for (let vehicle of eastbound) {
    vehicle.action();
  }

  for (let vehicle of westbound) {
    vehicle.action();
  }
}

function drawRoad() {
  // Draw road
  fill(220);
  rect(0, 0, width, roadWidth);
  rect(0, height - roadWidth, width, roadWidth);
  
  // Draw dividing line
  stroke(0);
  strokeWeight(3);
  let x = 0;
  while (x < width) {
    line(x, height/2, x+30, height/2);
    x += 60;
  }
}

class Vehicle {
  //All the functions of the Vehicle
  constructor(type, color, x, y, direction, xSpeed) {
    this.type = type;
    this.color = color;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.xSpeed = xSpeed;
  }
  
  display() {
    fill(this.color);
    if (this.type === 0) {
      rect(this.x, this.y + 10, 40, 10);
      rect(this.x + 10, this.y, 20, 10);
      ellipse(this.x + 10, this.y + 20, 10, 10);
      ellipse(this.x + 30, this.y + 20, 10, 10);
    } 
    else {
      rect(this.x, this.y + 10, 60, 20);
      rect(this.x + 10, this.y, 40, 10);
      rect(this.x + 20, this.y - 10, 20, 10);
      ellipse(this.x + 10, this.y + 30, 10, 10);
      ellipse(this.x + 50, this.y + 30, 10, 10);
    }
  }
  
  move() {
    this.x += this.xSpeed;
    if (this.x > width && this.direction === 1) {
      this.x = -60;
    } 
    else if (this.x < -60 && this.direction === 0) {
      this.x = width;
    }
  }
  
  speedUp() {
    this.xSpeed = constrain(this.xSpeed + 0.5, -15, 15);
  }
  
  speedDown() {
    this.xSpeed = constrain(this.xSpeed - 0.5, -15, 15);
  }
  
  changeColor() {
    this.color = color(random(255), random(255), random(255));
  }
  
  action() {
    this.move();
    if (random(100) < 1) {
      this.speedUp();
    }
    if (random(100) < 1) {
      this.speedDown();
    }
    if (random(100) < 1) {
      this.changeColor();
    }
    this.display();
  }
}

function mouseClicked() {
  //To run with mouse functiona dn populate arrays with more cars accordingly
  if (mouseButton === LEFT) {
    if (keyIsDown(SHIFT)) {
      let yPos = random(height/2 + 20, height - 140 );
      westbound.push(new Vehicle(Math.round(random(0,1)), color(0, 0, 255), random(width), yPos, 0, random(-15, -3)));
    } 
    else {
      let yPos = random(100, height/2 - 20);
      eastbound.push(new Vehicle (Math.round(random(0,1)), color(255, 0, 0), random(width), yPos, 1, random(3, 15)));
    }
  }
}
