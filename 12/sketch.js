let points =[];
let reach  = 150;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for(let p of points){
    p.display();
    p.connect(points);
    p.move();
  }
}

function mouseClicked(){
  points.push(new MovingPoint(mouseX,mouseY));
}

class MovingPoint{
  constructor(x,y){
    this.x = x; this.y = y; this.size = 20;
    this.c = color(random(255),random(255),random(255));

    this.xTime = random(10); this.yTime = random(10);
    this.timeShift = 0.01; this.maxSpeed = 5;
  }

  display(){
    fill(this.c);
    noStroke;
    let d = dist(mouseX,mouseY,this.x,this.y);

    if (d<reach){
      this.size =map(d,0,reach,60,20);

    }
    else{
      this.size = 20;
    }

    circle(this.x,this.y,this.size);
  }

  getX() {return this.x}
  getY() {return this.y}

  connect(pointArray){
    stroke(this.c);
    for(let p of points){
      if(p !== this){
        let d = dist(this.x,this.y,p.getX(),p.getY());
        if(d<reach){
          line(this.x,this.y,p.getX(),p.getY());
        }
      }
    }
  }

  move(){
    let xSpeed = noise(this.xTime);
    xSpeed = map(xSpeed,0,1,-this.maxSpeed,this.maxSpeed);
    this.x += xSpeed;

    if(this.x<0)( this.x = width);
    else if(this.x>width) this.x = 0;
  }
}
