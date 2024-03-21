// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let gridSpacing = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(2);
  drawLines();
}

function draw() {
  randomSeed(1000000000000);
  gridSpacing = map(mouseX , 0 , width , 60 , 10);
  background(220);
  drawLines();

}

function diagonalAsc(x,y,s){
  line(x-s/2,y+s/2,x+s/2,y-s/2);
}

function diagonalDsc(x,y,s){
  line(x+s/2,y+s/2,x-s/2,y-s/2);
}

function drawLines(){
  for(let x= 0; x<width;x+=gridSpacing){
    for(let y= 0; y<height;y+=gridSpacing){
      let choice = int(random(2));
      if (choice===0){
        diagonalAsc(x,y,gridSpacing);
      }

      else if (choice===1){
        diagonalDsc(x,y,gridSpacing);
      }
      diagonalDsc(x,y,gridSpacing);
    }
  }
}
