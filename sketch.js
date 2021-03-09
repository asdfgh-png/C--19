var ghost , ghostImg , ghostImg2 ;
var door , doorImg , climber , climberImg ;
var tower , towerImg ;
var doorGroup , climberGroup , groundGroup ;
var ground ;
var gameState = "play" ;
var score = 0 ;
function preload(){
  
  ghostImg = loadAnimation("ghostStd.png") ;
  ghostImg2 = loadAnimation("ghostJ.png") ;
  
  doorImg = loadImage("door.png") ;
  climberImg = loadImage("climber.png") ;
  towerImg = loadImage("tower.png") ;
  
}
 
function setup(){
  
  createCanvas(600,500) ;
  
  tower = createSprite(250,250) ;
  tower.addImage(towerImg) ;
  tower.velocityY = 1 ;
  
  ghost = createSprite(250,50,20,20) ;
  ghost.addAnimation("standing",ghostImg) ;
  ghost.scale = 0.4;
  
  doorGroup = new Group() ;
  climberGroup = new Group () ;
  groundGroup = new Group () ;
  
}

function draw(){
  
  if(gameState === "play"){
  if(tower.y > 580){
    tower.y = 250 ;
  }
  
  if(keyDown("Space")){
    ghost.velocityY = ghost.velocityY - 1  ;
  }
  
    ghost.velocityY = ghost.velocityY + 0.2 ;
  
  if(keyDown("left_arrow")){
     ghost.x = ghost.x - 3 ;
     }
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 3 ;
  }
  
  if(ghost.collide(climberGroup)){
    ghost.velocityY = 0 ;
  }
    spawnDoors() ;
  spawnClimbers() ;
  }
 
  if(ghost.isTouching(groundGroup) || (ghost.y > 500)){
    ghost.destroy() ;
    gameState = "end" ;
    
  }
 // console.log(tower.y);
  if( frameCount % 100 === 0 && frameCount > 0 ){
    score ++ ;
  }  
  drawSprites() ;
  
   if(gameState === "end"){
    background("black");
    fill("yellow");
    textSize(40) ;
    text("GAME OVER !!!",150,250);
    
  }
  
  fill("black") ;
  textSize(25) ;
  text("score = " + score , 50,50);
}

function spawnDoors(){
  if(frameCount % 350 === 0){
  door = createSprite(200,-50,20,20) ;
  door.addImage(doorImg) ;
  door.x = Math.round(random(100,400)) ;
  door.scale = 1.2 ;
  door.velocityY = 1 ;
  door.lifetime = 550 ;
  ghost.depth = door.depth ;
  ghost.depth ++ ;
  doorGroup.add(door) ;
  }
}

function spawnClimbers(){
  if(frameCount % 350 === 0){
    climber = createSprite(200,20,20,20) ;
    climber.addImage(climberImg) ;
    climber.scale = 0.8 ;
    climber.x = door.x ;
    climber.velocityY = 1 ;
    climber.lifetime = 550 ;
    ghost.depth = climber.depth ;
    ghost.depth ++ ;
    climberGroup.add(climber) ;
    
    ground = createSprite(200,25,20,20) ;
    ground.visible = false ;
    ground.x = climber.x ;
    ground.y = climber.y + 10 ;
    ground.velocityY = climber.velocityY ;
    ground.debug = true ;
    ground.setCollider("rectangle",0,0,60,5) ;
    groundGroup.add(ground) ;
    
  }
}