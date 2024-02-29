//Gradient Background
// Dilpreet
// 29 February, 2024
//Creating a gradient + drawing with neste d loops 


let rectHeight =  2;
let spacing = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  gradientBackground(220);
  nestedLoop();
}

function nestedLoop(){
  for(let x=0;x<100;x+=spacing){
    for(let y=0;y<100;y+=spacing){
      circle(x,y,10);
    }
  }
}

function gradientBackground(){
  let y = 0;
  while(y<height){
    let c = color(mouseX,map(y,0,height,0,255),map(y,0,height,0,255));
    fill(c);

    rect(0,y,width,rectHeight);
    y+=rectHeight;
  }

}