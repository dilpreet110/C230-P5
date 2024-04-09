// Art Replication Project
// Dilpreet Singh Sidhu
// 1 April , 2024
//
// Extra for Experts:
// make amplitude like lines


let amplitude = 20; // Define the amplitude of the wave

function setup() {
  createCanvas(windowWidth, windowHeight); 
  strokeWeight(2);
  // Loop through y values to draw multiple waveforms
  for (let y = 50; y < height - 50; y += 10) {
    drawWaveform(y); 
  }
}

function drawWaveform(y) {
  let frequency = 1; // Define the frequency of the wave

  // Loop through x values to draw the waveform
  for (let x = 20; x < width - 20; x++) {
    let mappedX = map(x, 20, width - 20, 0, 1.5 * PI); 
    let mappedY = map(y, 50, height - 50, 0, 89); 
    let offsetY = amplitude * sin(frequency * mappedX); // Calculate the vertical offset of the wave
    let waveY = y + offsetY; // Calculate the y-coordinate of the wave
    point(x, waveY); // Draw a point at the calculated position
    frequency += 0.01; 
  }
}