var balloon,bg,balloonA
var database

function preload(){
bg = loadImage("Hot Air Ballon-01.png")
balloonA = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png")
}
function setup() {
 database = firebase.database()
  createCanvas(1200,700);
  balloon = createSprite(400, 400, 50, 50);
  balloon.addAnimation("adding",balloonA);
  balloon.scale = 0.2
  var PositionX = database.ref('Balloon/position')
  PositionX.on("value",readPosition,showError);
}

function draw() {
  background(bg);  
  if(keyDown(UP_ARROW)&&balloon.y>100){
   writePosition(0,-100);
   if(balloon.scale>0.1){
    balloon.scale = balloon.scale-0.1
   }
  }
  else if(keyDown(DOWN_ARROW)&&balloon.y<500){
    writePosition(0,100);
    if(balloon.scale<0.9){
      balloon.scale = balloon.scale+0.1
    }
  }
  else if(keyDown(LEFT_ARROW)){
    writePosition(-100,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(100,0);
  }
  drawSprites();
}
var Position
function readPosition(data){
  Position = data.val()
  balloon.x = Position.x
  balloon.y = Position.y;
}
function writePosition(x,y){
  database.ref('Balloon/position').set({
    'x': balloon.x+x,
    'y': balloon.y+y
  })
   
}

function showError(){
  console.log("letgf")
}