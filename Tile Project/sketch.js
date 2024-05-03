// Grid Challenge
// Dilpreet
// 29 April, 2024
//
// Extra for Experts:
// - To create a basic grid and flip colours in + position if all colours are same user wins.


let grid = [];
let squareSize = 50;
const NUM_ROWS = 4;
const NUM_COLS = 5;
let row, col;

function setup() {
  createCanvas(NUM_COLS * squareSize, NUM_ROWS * squareSize);
  initializeGrid(); // Set the provided grid arrangement
}

function draw() {
  col = getCurrentX();
  row = getCurrentY();
  background(220);
  drawGrid();
}

function mousePressed() {
  if (keyIsDown(SHIFT)) {
    flip(col, row);
  } else {
    let neighbors = [
      [col, row - 1], 
      [col, row + 1], 
      [col - 1, row], 
      [col + 1, row]  
    ];
    for (let neighbor of neighbors) {
      let x = neighbor[0];
      let y = neighbor[1];
      if (x >= 0 && x < NUM_COLS && y >= 0 && y < NUM_ROWS) {
        flip(x, y);
      }
    }
    flip(col, row); // Flip the clicked square as well
  }
  checkWinCondition();
}

function flip(x, y) {
  if (grid[y][x] === 0) grid[y][x] = 255;
  else grid[y][x] = 0;
}

function getCurrentY() {
  let constrainY = constrain(mouseY, 0, height - 1);
  return int(constrainY / squareSize);
}

function getCurrentX() {
  let constrainX = constrain(mouseX, 0, width - 1);
  return int(constrainX / squareSize);
}

function drawGrid() {
  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      let fillValue = grid[y][x];
      fill(fillValue);
      square(x * squareSize, y * squareSize, squareSize);
    }
  }
}

function initializeGrid() {
  // Use the grid arrangement
  grid = [
    [0, 255, 0, 255, 0],
    [0, 0, 255, 0, 0],
    [0, 255, 255, 0, 255],
    [255, 255, 0, 255, 255]
  ];
}

function checkWinCondition() {
  let firstValue = grid[0][0];
  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      if (grid[y][x] !== firstValue) {
        return;
      }
    }
  }
  // If all elements are identical
  alert("You Win!");
}