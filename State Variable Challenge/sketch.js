// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  moveSquare();
  square(X,Y,50)
}

let X = 0;
let Y = 0;

function moveSquare(){
  if(Y===0 && X<350)(X+=5);
  else if(X===350 && Y<350)(Y+=5);
  else if(Y===350 && X>0)(X-=5);
  else if(X===0 && Y>0)(Y-=5);
}