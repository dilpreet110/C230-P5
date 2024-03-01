//Gradient Background
// Dilpreet
// 29 February, 2024
//Creating a gradient + drawing with nested loops 


let rectHeight =  2;
let circlesize = 20;
let spacing = 40;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  gradientBackground(220);
  nestedLoop();
}

function circleDistance(x1,y1,x2,y2){
  let a = abs(x1-x2);
  let b = abs(y1-y2);
  let c = sqrt(pow(a,2)+pow(b,2));
  return c;
}
  


function nestedLoop(){
  for(let x=0;x<width;x+=spacing){
    for(let y=0;y<height;y+=spacing){
      fill(255);
      circle(x,y,circlesize);
      fill(0);
      textAlign(CENTER,CENTER);
      let d = round(circleDistance(x,y,mouseX,mouseY));
      text(d,x,y);
    }
  }
}

function gradientBackground(){
  let y = 0;
  while(y<height){
    let c = color(mouseX,map(y,0,height,0,255),map(mouseY,0,height,0,255));
    fill(c);

    rect(0,y,width,rectHeight);
    y+=rectHeight;
  }

}