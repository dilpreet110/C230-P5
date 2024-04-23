// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = 
[ [0  , 50  , 100 , 150 , 200],
  [0  ,  0  ,   0 ,   0 ,   0],
  [30 , 40  , 50  , 60  ,  70],
  [255, 225 , 255 , 255 , 255]

];

let squareSize = 50;
const NUM_ROWS = 4; const NUM_COLS = 5;


function setup() {
  createCanvas(NUM_COLS*squareSize, NUM_ROWS*squareSize);
}

function draw() {
  background(220);
  drawGrid();
}

function drawGrid(){
  for(let y = 0; y<NUM_ROWS ; y++){
    for(let x = 0; x<NUM_COLS; x++){
      let fillValue = grid[y][x];
      fill(fillValue);
      square(x*squareSize,y*squareSize,squareSize);      
    }
  }
}