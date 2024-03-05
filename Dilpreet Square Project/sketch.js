// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let colors = [];

function setup() {
  createCanvas(400, 400);
}  

function draw() {
  background(220);
  randomColor();
  drawSquare();
}


let overallSpacing = 20;

function drawSquare(){
  let spacing = overallSpacing;
  function mouseClicked(){
    spacing +=10;
  }
  for(let x = 0; x<width;x+=spacing){
    for(let y = 0; y<height;y+=spacing){
      let colorIndex = floor(x / spacing) + floor(y / spacing*spacing);
      fill(colors[colorIndex]);
      rect(x,y,spacing,spacing);
    }

  }
}

function randomColor(){
  let spacing = overallSpacing;
  let totalSquares=(width/spacing)*(height/spacing);
  for(let i=0;i<totalSquares;i++){
    colors.push(color(random(255), random(255), random(255)));
  }
}


