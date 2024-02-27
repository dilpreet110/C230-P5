// Drawing with loops 1
// Dilpreet
// 27 February, 2024
//Using loops to create some visualization

//Global Variables
let xPos , yPos;

function setup() {
  createCanvas(400, 400);
  xPos = [width*0.05 , width*0.95 , width*0.05 , width*0.95  ];
  yPos = [height*0.95 , height*0.95 , height*0.05 , height*0.05  ];
}

function draw() {
  background(220);
  corners_and_mouse_loop();
}


function mousePressed(){
  xPos.push(mouseX);
  yPos.push(mouseY);
}

function corners_and_mouse_loop(){
  let i = 0;
  while(i < xPos.length){
    let x = xPos[i];
    let y = yPos[i];
    circle(x,y,20);
    line(x,y,mouseX,mouseY);
    circle(mouseX,mouseY,20);
    i++;
  }

}


function corners_and_mouse(){
  //draw some circles near each of the four corners and connect some lines from there to the mouse position
  fill(255)
  circle(width*0.05 , height*0.05 , 20);
  circle(width*0.95 , height*0.95 , 20);
  circle(width*0.05 , height*0.95 , 20);
  circle(width*0.95 , height*0.05 , 20);

  line(width*0.05 , height*0.05 , mouseX , mouseY);
  line(width*0.95 , height*0.95 , mouseX , mouseY);
  line(width*0.05 , height*0.95 , mouseX , mouseY);
  line(width*0.95 , height*0.05 , mouseX , mouseY);
}