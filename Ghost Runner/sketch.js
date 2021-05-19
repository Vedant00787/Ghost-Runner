var gs="PLAY";
var towerImg,tower;
var doorImg,door,doorgroup;
var climberImg,climber,climbergroup;
var ghostImg,ghost;
var invisibleblock,ibg;
var spookysound;

function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  spookysound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookysound.loop();
  tower=createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY=1;
  ghost=createSprite(200,200,50,50);
  ghost.scale=0.3;
  ghost.addImage(ghostImg);
  doorgroup = new Group();
   climbergroup = new Group();
  ibg = new Group();
}
function draw(){
  background(0);
if(gs==="PLAY"){
  
  if(tower.y > 400){
    tower.y=300;
  }
  
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY=-10;
  }
  ghost.velocityY=ghost.velocityY+0.2;
  if(climbergroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(ibg.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
  }
  
  
  
  spawndoors();
  drawSprites();
}
  if(gs==="END"){
    stroke("yellow");
    fill("yellow");
    text("GAME OVER",230,250);
  }
}

function spawndoors(){
  if(frameCount % 240 === 0){
    var door=createSprite(200,-50);
    door.addImage(doorImg);
    var climber=createSprite(200,10);
    climber.addImage(climberImg);
    door.x = Math.round(random(120,400));
    door.velocityY=1;
    climber.x=door.x;
    climber.velocityY=1;
    climber.lifetime=800;
    climbergroup.add(climber);
    door.lifetime=800;
    doorgroup.add(door);
    ghost.depth=door.depth;
    ghost.depth+=1;
    var invisibleblock=createSprite(200,15);
    invisibleblock.width=climber.width;
    invisibleblock.height=2;
    invisibleblock.x=door.x;
    invisibleblock.velocityY=1;
    invisibleblock.lifetime=800;
    invisibleblock.debug=true;
    ibg.add(invisibleblock);
  }
}