// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let roundRacers = [];
const NUM_ROUND_RACERS = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Set up some RoundRacer objects
  for (let i = 0; i < NUM_ROUND_RACERS; i++) {
    let c = color(random(255), random(255), random(255));
    let y = random(height);
    roundRacers.push(new RoundRacer(y, c));
  }
  noStroke();
}

function draw() {
  background(0); // Clear the canvas on each frame
  for (let racer of roundRacers) {
    racer.move();
    racer.display();
  }
}

class RoundRacer {
  // Constructor
  constructor(yPosition, color) {
    this.xPosition = 0;
    this.yPosition = yPosition;
    this.xSpeed = Math.floor(random(3, 16)); // Random number between 3 and 15
    this.color = color;
  }

  // Class Methods
  move() {
    this.xPosition += this.xSpeed;
    if (this.xPosition > width) {
      this.xPosition = 0;
    }
  }

  display() {
    fill(this.color);
    ellipse(this.xPosition, this.yPosition, 20, 20);
  }
}