// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let tiles = []; //0 grass 1 chicke 2 cow 3 star
let level = [
  [0 , 1 , 0 , 3 , 0],
  [1 , 0 , 0 , 1 , 0],
  [0 , 1 , 1 , 0 , 0],
  [0 , 1 , 0 , 0 , 0],
  [0 , 0 , 1 , 0 , 0]
];

const COLUMNS = 5; const ROWS = 5; const TILE_SIZE = 100;
let playerX =  3; let playerY = 4;

function preload(){
  for(let i =0; i<4;i++){
    tiles.push(loadImage("assets/"+i+".png"));
  }
}

function setup() {
  createCanvas(COLUMNS*TILE_SIZE, ROWS*TILE_SIZE);
}

function draw() {
  background(220);
  renderboard();
}

function swap(x1,y1,x2,y2){
  let temp = level[y1][x1]
  level[y2][x2] = level[y1][x1];
  level[x2][y2] = temp;
}

function renderboard(){
  for(let x = 0; x<COLUMNS; x++){
    for(let y = 0; y<ROWS; y++){
      let type = level[y][x];
      let currentImage = tiles[type];
      image(currentImage, x*TILE_SIZE , y*TILE_SIZE);
    }
  }
}
