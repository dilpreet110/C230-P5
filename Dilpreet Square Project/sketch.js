// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let colors = [];
let overallSpacing = 20;

function setup() {
  createCanvas(400, 400);
  document.addEventListener("contextmenu", event => event.preventDefault());

}  

function draw() {
  background(220);
  randomColor();
  drawSquare();
}

function mousePressed(){
  if (mouseButton === RIGHT) {
    overallSpacing += 5; 
  } 
  else if(mouseButton === LEFT && overallSpacing>10) {
    overallSpacing -= 5; 
  }
  redraw();
}

function keyPressed(){
  location.reload();
}

function drawSquare(){
  let spacing = overallSpacing;

  
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


