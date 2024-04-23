// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let myPlanet;

function setup() {
  createCanvas(windowWidth, windowHeight);
  myPlanet = new Planet(width/2,height/2);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  myPlanet.display();
}

function mouseClicked(){
  if(keyIsPressed && keyCode === SHIFT){
    myPlanet = new Planet(mouseX,mouseY);
  }
  else{
    myPlanet.createMoon();
  }
}

class Planet{
  constructor(x,y){
    this.x = x ; this.y = y; this.s = 100;
    this.moons = [];
  }

  createMoon(){
    this.moons.push(new Moon);
  }

  display(){
    circle(this.x,this.y,this.s);
    for(let m of this.moons){
      m.update();
    }
  }

}

class Moon{
  constructor(x,y){
    this.x = x; this.y = y; this.speed = 2;
    this.angle = 0; this.orbitRadius = 80; this.s = 25;
  }

  update(){
    this.move();
    this.display();
  }

  move(){
    this.angle+=this.speed;
  }
  display(){
    push();
    translate(this.x,this.y);
    circle(this.orbitRadius,0,this.s);
    pop();
  }

}



