var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground,fish_swimming,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,gameover,booster;
var Score = 0;

function preload(){
  fish_swimming = loadAnimation("fish1.png","fish2.png","fish3.png");
  groundImage = loadImage("underwaterimage.jpg");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  gameover = loadImage("game over.jpg");
  booster = loadImage("time-freeze.png");


}

function setup() {
  createCanvas(windowWidth,windowHeight);
  ground = createSprite(200,316,400,400);
  fish = createSprite(300,233,20,20);

  fish.addAnimation("swimming",fish_swimming);
  fish.scale = 2.5;
  //fish.setCollider(rectangle,0,0,20,20)

  ground.addImage(groundImage);
  ground.scale = 1.3;

  ground.velocityX = -4;

  gameOver = createSprite(300,200);
  gameOver.addImage(gameover);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  ground.x = ground.width/2;

  obstaclesGroup = new Group();

 

  score = 0;

}


function draw() {
  //trex.debug = true;
  background("#229bac");
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && fish.y >= 159) {
      fish.velocityY = -12;
    }
  
    fish.velocityY = fish.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    spawnObstacles();
  
    if(obstaclesGroup.isTouching(fish)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    //restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    fish.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
   // cloudsGroup.setVelocityXEach(0);
   
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    fill("green")
  textSize(30)
  text("Score: "+ score, 500,50);
    
  }
  
  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(windowWidth,random(100,windowWidth - 100),10,40);
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
            
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
  }
}
