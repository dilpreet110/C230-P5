// OOP Pair Programming Starter Code
// Your Names
// The Date


// ------------------------------------------------------------------------- //
// You don't need to edit this section...
let bullets = [];
let enterprise;
let shipImage, bulletImage;

function preload() {
  shipImage = loadImage("assets/enterprise.png");
  bulletImage = loadImage("assets/laser-shot.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  enterprise = new Ship(width/2, height/2, shipImage);
}

function draw() {
  background("black");
  for(let i =  0; i<bullets;i++){
    let b = bullets[i];
    if(!b.isOnScreen()){
      bullets.splice();

    }
    b.display();
    b.update();
  }
  enterprise.update();
  enterprise.display();
  
}

function keyPressed() {
  enterprise.handleKeyPress();
}

// ------------------------------------------------------------------------- //
// Start editing here!

class Ship {
  constructor(x, y, theImage) {
    // define the variables needed for this ship
    this.x = x; this.y = y; this.image = theImage;
  }

  update() {
    // move ship -- you might want to use the keyIsDown() function here
    if(keyIsDown(87)){
      this.y-=5;
    }
    else if(keyIsDown(83)){
      this.y+=5;
    }
    else if(keyIsDown(68)){
      this.x+=5;
    }
    else if(keyIsDown(65)){
      this.x-=5;
    }

    // if doing extra for experts, show bullet(s)
  }

  display() {
    // show the ship
    image(this.image,this.x,this.y);
  }

  handleKeyPress() {
    if(keyCode===32){
      bullets.push(new Bullet(this.x,this.y,bulletImage));
    }
  }
}

// ------------------------------------------------------------------------- //

// Extra for Experts 
//  - you can instantiate a bullet (or a bullet array) within the Ship class,
//    and call the display and update functions in the logical location of the 
//    Ship class. If you create an array of bullets, you might want to think about
//    when the bullets should be removed from the array...

class Bullet {
  constructor(x, y, theImage) {
    // define the variables needed for the bullet here
    this.x = x+ 40; this.y = y ; this.image = theImage;
  }

  update() {
    this.y -=5;
  }

  display() {
    image(this.image,this.x,this.y);
  }

  isOnScreen() {
    if(this.y<0){
      return true;
    }
  }
}


