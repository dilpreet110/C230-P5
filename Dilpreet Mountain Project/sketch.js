// Mountain Project
// Dilpreet Singh Sidhu
// !4 March, 2024
//
// Creating mountains and panning them , and finding average and highest point:
// - Using perlin noise funcion and various loops.


let rectWidth = 2; // Initial width of rectangles
let perlinXOffset = 0; // X offset for Perlin noise function
let highestPeakX = 0; // X coordinate of the highest peak
let highestPeakY = 0; // Y coordinate of the highest peak
let averageHeight = 0; // Average height of the terrain
let perlinXOffset2 = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(100);
  //generateTerrain();
}

function draw() {
  background(220);
  perlinXOffset += 0.01;
  perlinXOffset2 += 0.02;
  

  generateTerrain2();
  generateTerrain();
  drawFlag(highestPeakX, highestPeakY);

  calculateAverageHeight();
  drawAverageLine();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    rectWidth -= 5; 
    generateTerrain(); 
  } 
  else if (keyCode === RIGHT_ARROW) {
    rectWidth += 5; 
    generateTerrain(); 
  }
}

function generateTerrain() {
  fill(82,125,243);
  let xoff = perlinXOffset2;
  let highest = 0;
  highestPeakX = 0;
  
  for (let x = 0; x < width; x += rectWidth) {
    let h = map(noise(xoff),0,1,0,height);
    rect(x, height-h, rectWidth, h);
    
    // Update highest peak
    if (h > highest) {
      highest = h;
      highestPeakX = x;
      highestPeakY = height - h;
    }
    
    xoff += 0.01; 
  }
}

function generateTerrain2() {
  frameRate(400);
  fill(0);
  let xoff = perlinXOffset;
  let highest = 0;
  highestPeakX = 0;
  
  for (let x = 0; x < width; x += rectWidth) {
    let h = map(noise(xoff),0,1,0,height);
    rect(x, height-h, rectWidth, h);
    
    // Update highest peak
    if (h > highest) {
      highest = h;
      highestPeakX = x;
      highestPeakY = height - h;
    }
    
    xoff += 0.01; 
  }
}

function drawFlag(x, y) {
  fill(0);
  line(x , y - 40, x, y);
  fill(255, 0, 0);
  triangle(x, y-20, x , y - 40, x + 20, y - 40);
  fill(0);
  line(x , y - 40, x, y);
}

function calculateAverageHeight() {
  let total = 0;
  let count = 0;
  for (let x = 0; x < width; x += rectWidth) {
    let h = map(noise(perlinXOffset),0,1, 0,height);
    total += h;
    count++; 
  }
  averageHeight = total / count;
}

function drawAverageLine() {
  stroke(0, 0 , 255); 
  line(0, height - averageHeight, width, height - averageHeight);
  stroke(0);
}
