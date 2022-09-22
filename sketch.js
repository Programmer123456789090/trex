
var trex ,trex_running;
var score = 0
var PLAY=1
var END=0
var Gamestate=PLAY
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png")
  cloudImage= loadImage('cloud.png')
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  trex_collided = loadImage("trex_collided.png")
}
function setup(){
  createCanvas(600,200)
  ground = createSprite(200,180,400,20)
  ground.addImage("ground",groundImage)
  invisibleGround = createSprite(200,190,400,10)
  invisibleGround.visible=false
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running",trex_running)
  edges = createEdgeSprites()
  trex.scale = 0.5 
  trex.x=50
  obstaclegroup=new Group()
  cloudgroup=new Group()
  // trex.setCollider("rectangle",0,0,400,trex.height)
}
function draw(){
  background("white")
  text("pontuação "+score,500,50)
  if(Gamestate===PLAY){
    
    ground.velocityX=-2
    score=score+Math.round(frameCount/60)
    if(ground.x<0){
      ground.x=ground.width/2
    } 
    if(keyDown("space")&&trex.y>=159){
      trex.velocityY=-10.5
    }
    spawnClouds()
  spawnObs()
    trex.velocityY+=0.5
    if(obstaclegroup.isTouching(trex)){
      Gamestate=END
    }
  }else if(Gamestate===END){
  ground.velocityX=0
  }
  trex.collide(invisibleGround)
  
  
  drawSprites();
  
}
  function reset(){
}
  function spawnObs(){
  if(frameCount%60===0){
  var obstacle=createSprite(590,160,10,40)
  obstacle.velocityX=-6
  var rand=Math.round(random(1,6))
  switch(rand){
    case 1:obstacle.addImage(obstacle1)
    break
    case 2:obstacle.addImage(obstacle2)
    break
    case 3:obstacle.addImage(obstacle3)
    break
    case 4:obstacle.addImage(obstacle4)
    break
    case 5:obstacle.addImage(obstacle5)
    break
    case 6:obstacle.addImage(obstacle6)
    break
    default:
    break

  }
  obstacle.scale=0.5
  obstacle.lifetime=300
  obstaclegroup.add(obstacle)
  }
            
}
  function spawnClouds(){
  if(frameCount%60===0){
    cloud=createSprite(600,100,40,10)
    cloud.velocityX=-3
    cloud.addImage("Cloud",cloudImage)
    cloud.scale=0.4
    cloud.y=Math.round(random(20,61))
    cloud.depth=trex.depth
    trex.depth+=1
    cloud.lifetime=200
    cloudgroup.add(cloud)
  }
  
}