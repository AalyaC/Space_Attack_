PLAY=1;
END=0;
gameState=PLAY;
var player , playerImg ;
var enemy , enemyImg , enemyGrp;
var bullet , bulletImg , bulletGrp , boomImg;
var spaceImg , score , gameOver,gameOverImg , reset,resetImg;
var gameOverSound , shootSound ;


function preload() {
  
  spaceImg = loadImage("bg.jpg");
  playerImg = loadImage("player.png");
  enemyImg = loadImage("enemy.png");
  bulletImg = loadImage("Bullet (1).png");
  boomImg=loadImage("boom.png");
  gameOverImg=loadImage("gameOver.png");
  resetImg=loadImage("restart.png");
  shootSound = loadSound("shoot.wav");
  gameOverSound = loadSound("gameOver.wav");
}

function setup(){
  createCanvas(500,600);

  player = createSprite(250,530,40,40);
  player.addImage("player",playerImg);
  player.scale=1.2;

  gameOver = createSprite(250,220);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.scale=0.90;

  reset = createSprite(250,280);
  reset.addImage("reset",resetImg);
  reset.scale=0.75;

  bulletGrp = new Group();
  enemyGrp = new Group();
  
  score=0;

}

function draw() {
  background(spaceImg); 

  gameOver.visible=false;
  reset.visible=false;

  if(gameState===PLAY){
    if(keyDown("right_arrow") && player.x<499){
      player.x=player.x+5;
    }
  
    if(keyDown("left_arrow") && player.x>1){
      player.x=player.x-5;
    }
  
    if(keyDown("up_arrow")){
      spawnBullet();
      shootSound.play();
    }
  
    if(bulletGrp.isTouching(enemy)){
      bullet.destroy();
      enemy.destroy()
      score = score + 5;
    }

    if(enemyGrp.isTouching(player)){
      player.addAnimation("boom",boomImg);
      player.changeAnimation("boom");
      player.scale=0.5;
      gameOverSound.play()
      gameState=END;
    }

    spawnEnemy(); 
  } else if(gameState===END){
  enemyGrp.velocityY=0;
  enemyGrp.destroyEach();
  gameOver.visible=true;
  reset.visible=true;
  }

  
  if(mousePressedOver(reset)){
    restart();
  }
  
  fill("white");
  textSize(20);
  text("Score :" + score ,400,550);

  drawSprites();
}

function spawnBullet(){
 bullet = createSprite(250,530,10,10);
 bullet.addImage("bullet",bulletImg);
 bullet.scale=0.25
 bullet.y=490;
 bullet.x=player.x;
 bullet.velocityY=-7;
 bullet.lifetime=500;
 bulletGrp.add(bullet);

}

function spawnEnemy(){
 if(frameCount%150 === 0){
 enemy = createSprite(250,10,40,40);
 enemy.addImage("enemy",enemyImg);
 enemy.scale=0.25
 enemy.x=Math.round(random(20,480));
 enemy.y=5;
 enemy.velocityY=(2+score/5);

 enemyGrp.add(enemy);

 }
}

function restart(){
gameState=PLAY;
score=0;
player.changeAnimation("player");
player.scale=1.2
}