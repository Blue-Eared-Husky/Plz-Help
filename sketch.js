var defaultbg,bgImg,logo,logoImg, endImg; // bg, logo, endingImg
var playButton,lvl1button,lvl2button,lvl3button,lvl4button,lvl5button,completed = 0; //buttons
var lvl2lock,lvl3lock,lvl4lock,lvl5lock,lvl2lockImg,lvl3lockImg,lvl4lockImg,lvl5lockImg; //locks
var plr,direction = 1,gravity,wall1,wall2,ground,plrHealth = 100,plrLeft,plrRight,plrFd,plrBulletImg,plrBulletLeft,plrBulletRight,bulletmus,bullets = []; // plr
var lvl1bg,goopLeft,goopRight,bigGoopLeft,bigGoopRight,bigGoopFd,goopAtks; //gupu
var lvl2bg,fairyImg,birdImg,birdbulletImg, birdbullets = []; //pero
var lvl3bg,skeletonLeft,skeletonRight,skeletonAtk,zombImg,zombBulletImg,zombBullets = []; //nekros
var lvl4bg,fishLeft,fishRight,octopusImg,octopusPortal,octopusBulletImg,octopusBullets = [];//wai
var lvl5bg,lgmLeft,lgmRight,finalbossImg,snakeImg,snakes = []; //prodigium

var boss, goops = [], fairies = [], skeletons = [], fishes = [], lgms = [], enemies = [], octoportals = [];

var left_arrow,right_arrow,jump_button,shoot_button,tryAgain;

var bgmus,lvl1mus,lvl2mus,lvl3mus,lvl4mus,lvl5mus; //music

var hurtsound,footsteps; //sound effects

var START = 0, SELECT = 1, LVL1 = 2, LVL1BOSS = 3, LVL2 = 4, LVL2BOSS = 5, LVL3 = 6, LVL3BOSS = 7, LVL4 = 8, LVL4BOSS = 9, LVL5 = 10, LVL5BOSS = 11, PAUSE = 12, END = 100;
var gameState = START;
var isDead = false,isPlaying = false,isBoss = false,checks = 0;

function preload(){
  //single images
  bgImg = loadImage("./assets/ipad_bg.png");
  finalbossImg = loadImage("./assets/final_boss.png");
  logoImg = loadImage("./assets/logo.png");
  plrLeft = loadImage("./assets/necrolord_lt.png");
  plrRight = loadImage("./assets/necrolord_rt.png");
  plrFd = loadImage("./assets/necrolord_fd.png");
  octopusImg = loadImage("./assets/octopuscase.png");
  octopusPortal = loadImage("./assets/octopusportal.png");
  snakeImg = loadImage("./assets/Snake_Atk.png");
  zombImg = loadImage("./assets/puppetzomb.png");
  endImg = loadImage("./assets/ending.png")
  lvl1bg = loadImage("./assets/gupu_bg.png");
  lvl2bg = loadImage("./assets/peto_bg.png");
  lvl3bg = loadImage("./assets/nekros_bg.png");
  lvl4bg = loadImage("./assets/wai_bg.png");
  lvl5bg = loadImage("./assets/prodigium_bg.png");

  lvl2lockImg = loadImage("./assets/blankselect_2.png");
  lvl3lockImg = loadImage("./assets/blankselect_3.png");
  lvl4lockImg = loadImage("./assets/blankselect_4.png");
  lvl5lockImg = loadImage("./assets/blankselect_5.png");

  //animations
  // = loadAnimation("./assets/");
  plrBulletLeft = loadAnimation("./assets/Bullet_Left/bullet_lt0.png","./assets/Bullet_Left/bullet_lt1.png","./assets/Bullet_Left/bullet_lt2.png");
  plrBulletRight = loadAnimation("./assets/Bullet_Right/bullet_rt0.png","./assets/Bullet_Right/bullet_rt1.png","./assets/Bullet_Right/bullet_rt2.png");
  goopLeft = loadAnimation("./assets/Goop_Left/goop_lt0.png","./assets/Goop_Left/goop_lt1.png");
  goopRight = loadAnimation("./assets/Goop_Right/goop_rt0.png","./assets/Goop_Right/goop_rt1.png");
  fairyImg = loadAnimation("./assets/Wing_Monster/wingmonster0.png","./assets/Wing_Monster/wingmonster1.png","./assets/Wing_Monster/wingmonster2.png","./assets/Wing_Monster/wingmonster3.png");
  skeletonAtk = loadAnimation("./assets/Skeleton_Atk/skeleatk0.png","./assets/Skeleton_Atk/skeleatk1.png");
  skeletonLeft = loadAnimation("./assets/Skeleton_Left/skeleton_lt0.png","./assets/Skeleton_Left/skeleton_lt1.png");
  skeletonRight = loadAnimation("./assets/Skeleton_Right/skeleton_rt0.png","./assets/Skeleton_Right/skeleton_rt1.png");
  fishLeft = loadAnimation("./assets/Payara_Left/payara_lt0.png","./assets/Payara_Left/payara_lt1.png","./assets/Payara_Left/payara_lt2.png","./assets/Payara_Left/payara_lt3.png","./assets/Payara_Left/payara_lt4.png","./assets/Payara_Left/payara_lt5.png");
  fishRight = loadAnimation("./assets/Payara_Right/payara_lt0.png","./assets/Payara_Right/payara_lt1.png","./assets/Payara_Right/payara_lt2.png","./assets/Payara_Right/payara_lt3.png","./assets/Payara_Right/payara_lt4.png","./assets/Payara_Right/payara_lt5.png");
  lgmLeft = loadAnimation("./assets/Green_Monster_Left/lgm_lt0.png","./assets/Green_Monster_Left/lgm_lt1.png");
  lgmRight = loadAnimation("./assets/Green_Monster_Right/lgm_rt0.png","./assets/Green_Monster_Right/lgm_rt1.png");

  bigGoopFd = loadAnimation("./assets/Big_Goop_Atk_Fd/biggoop_fd0.png","./assets/Big_Goop_Atk_Fd/biggoop_fd0.png","./assets/Big_Goop_Atk_Fd/biggoop_fd0.png","./assets/Big_Goop_Atk_Fd/biggoop_fd0.png","./assets/Big_Goop_Atk_Fd/biggoop_fd0.png","./assets/Big_Goop_Atk_Fd/biggoop_fd0.png","./assets/Big_Goop_Atk_Fd/biggoop_fd0.png","./assets/Big_Goop_Atk_Fd/biggoop_fd0.png","./assets/Big_Goop_Atk_Fd/biggoop_fd1.png");
  bigGoopRight = loadAnimation("./assets/Big_Goop_Atk_Lt/biggoop_lt0.png","./assets/Big_Goop_Atk_Lt/biggoop_lt0.png","./assets/Big_Goop_Atk_Lt/biggoop_lt0.png","./assets/Big_Goop_Atk_Lt/biggoop_lt0.png","./assets/Big_Goop_Atk_Lt/biggoop_lt0.png","./assets/Big_Goop_Atk_Lt/biggoop_lt0.png","./assets/Big_Goop_Atk_Lt/biggoop_lt0.png","./assets/Big_Goop_Atk_Lt/biggoop_lt0.png","./assets/Big_Goop_Atk_Lt/biggoop_lt1.png");
  bigGoopLeft = loadAnimation("./assets/Big_Goop_Atk_Rt/biggoop_rt0.png","./assets/Big_Goop_Atk_Rt/biggoop_rt0.png","./assets/Big_Goop_Atk_Rt/biggoop_rt0.png","./assets/Big_Goop_Atk_Rt/biggoop_rt0.png","./assets/Big_Goop_Atk_Rt/biggoop_rt0.png","./assets/Big_Goop_Atk_Rt/biggoop_rt0.png","./assets/Big_Goop_Atk_Rt/biggoop_rt0.png","./assets/Big_Goop_Atk_Rt/biggoop_rt0.png","./assets/Big_Goop_Atk_Rt/biggoop_rt1.png");
  birdImg = loadAnimation("./assets/Strange_Bird/bird0.png","./assets/Strange_Bird/bird1.png","./assets/Strange_Bird/bird2.png","./assets/Strange_Bird/bird3.png");
  birdbulletImg = loadAnimation("./assets/Bird_Bullet/birdbullet0.png","./assets/Bird_Bullet/birdbullet1.png");
  zombBulletImg = loadAnimation("./assets/Zombie_Bullet/zombbullet0.png","./assets/Zombie_Bullet/zombbullet1.png");
  octopusBulletImg = loadAnimation("./assets/Octopus_Bullet/octobullet0.png","./assets/Octopus_Bullet/octobullet1.png","./assets/Octopus_Bullet/octobullet2.png");


  //music
  bg_mus = loadSound("./assets/Twinkling Starlight.mp3");
  lvl1mus = loadSound("./assets/Weird_Slime.mp3");
  lvl2mus = loadSound("./assets/Electric_Wings.mp3");
  lvl3mus = loadSound("./assets/SpookyScarySkeletons.wav");
  lvl4mus = loadSound("./assets/Turbulent_Waters.mp3");
  lvl5mus = loadSound("./assets/Last_Stand.mp3");

  bg_mus.setVolume(0.5);
  lvl1mus.setVolume(0.5);
  lvl2mus.setVolume(0.5);
  lvl3mus.setVolume(0.5);
  lvl4mus.setVolume(0.5);
  lvl5mus.setVolume(0.5);

  //sound effects
  hurtsound = loadSound("./assets/hurt.wav");
  footsteps = loadSound("./assets/footsteps.wav");
  bulletmus = loadSound("./assets/spawn_bullet.wav");
}

function setup() {
  createCanvas(320,240);

  rectMode(CENTER);
  ellipseMode(CENTER);
  imageMode(CENTER);

  plr = createSprite(20,height-30);
  plr.addImage("left",plrLeft);
  plr.addImage("right",plrRight);
  plr.addImage("forward",plrFd);
  plr.changeImage("right");
  plr.scale = 2;
  plr.setCollider("rectangle",0,5,10,20);
  plr.visible = false;

  ground = createSprite(width/2,height,width,30);
  ground.visible = false;

  wall1 = createSprite(0,height/2,30,height);
  wall1.visible = false;

  wall2 = createSprite(width,height/2,30,height);
  wall2.visible = false;

  logo = createSprite(width/2,50);
  logo.addImage(logoImg);
  logo.scale = 2;

  lvl1button = createImg("./assets/lvl1select.png");
  lvl1button.position(30,height/2);
  lvl1button.mousePressed(lvl1Pressed);
  
  lvl2button = createImg("./assets/lvl2select.png");
  lvl2button.position(30+60,height/2);
  lvl2button.mousePressed(lvl2Pressed);

  lvl2lock = createSprite(30+60+7,height/2+7);
  lvl2lock.addImage(lvl2lockImg);

  lvl3button = createImg("./assets/lvl3select.png");
  lvl3button.position(30+60+60,height/2);
  lvl3button.mousePressed(lvl3Pressed);

  lvl3lock = createSprite(30+60+60+7,height/2+7);
  lvl3lock.addImage(lvl3lockImg);

  lvl4button = createImg("./assets/lvl4select.png");
  lvl4button.position(30+60+60+60,height/2);
  lvl4button.mousePressed(lvl4Pressed);

  lvl4lock = createSprite(30+60+60+60+7,height/2+7);
  lvl4lock.addImage(lvl4lockImg);

  lvl5button = createImg("./assets/lvl5select.png");
  lvl5button.position(30+60+60+60+60,height/2);
  lvl5button.mousePressed(lvl5Pressed);

  lvl5lock = createSprite(30+60+60+60+60+7,height/2+7);
  lvl5lock.addImage(lvl5lockImg);

  left_arrow = createImg("./assets/Left_Arrow.png");
  left_arrow.position(width/2-65,10);
  left_arrow.mousePressed(moveLeft);

  right_arrow = createImg("./assets/Right_Arrow.png");
  right_arrow.position(width/2-2,10);
  right_arrow.mousePressed(moveRight);

  jump_button = createImg("./assets/jump_button.png");
  jump_button.position(width/2-18.7,27);
  jump_button.size(36,16.5);
  jump_button.mousePressed(moveUp);

  shoot_button = createImg("./assets/shoot.png");
  shoot_button.position(width/2-22.5,57);
  shoot_button.size(43.5,16.5);
  shoot_button.mousePressed(shoot);

  
  tryAgain = createButton('Try Again');
  tryAgain.position(width/2-35,height/2);

  lvl1button.hide();
  lvl2button.hide();
  lvl3button.hide();
  lvl4button.hide();
  lvl5button.hide();
  left_arrow.hide();
  right_arrow.hide();
  shoot_button.hide();
  jump_button.hide();
  tryAgain.hide();

  lvl2lock.visible = false;
  lvl3lock.visible = false;
  lvl4lock.visible = false;
  lvl5lock.visible = false;

  gravity = 2 ;

  playButton = createImg("./assets/play_button.png");
  playButton.position(width/2-22.4,75);
  playButton.size(42,20);
  playButton.mousePressed(playButtonPressed);  

  defaultbg = bgImg;
  plrBulletImg = plrBulletLeft;

  bg_mus.loop();
}

function draw() {
  background(10);
  plr.depth += 1;

  if (!isDead){
    image(defaultbg,width/2,height/2,64*5,48*5);
  }

  if (isPlaying && !isDead){
    fill("white");
    text("Health: " + plrHealth, 10, 50);
  }

  if (isBoss){
    fill("white");
    text("BOSS HEALTH: " + boss.health,width/2-51,15);
  }

  plr.velocityY += gravity;
  plr.collide(ground);

  for (var i = 0; i < enemies.length;i++){
    if (gameState === LVL1){
      checkEnemies(false,enemies[i].goop);
    }
    if (gameState === LVL2){
      checkEnemies(enemies[i].goop);
    }
    if (gameState === LVL3){
      checkEnemies(enemies[i].goop);
    }
    if (gameState === LVL4){
      checkEnemies(enemies[i].goop);
    }
    if (gameState === LVL5){
      checkEnemies(enemies[i].goop);
    }
  }

  if (plrHealth <= 0){
    isDead = true;
    plr.visible = false;

    jump_button.hide();
    left_arrow.hide();
    right_arrow.hide();
    shoot_button.hide();

    fill(255);
    textSize(15);
    text("You Died! Would you like to try again?",width/2-127,50);
    tryAgain.show();
    tryAgain.mousePressed(lvl1Pressed);
  }

  if (enemies.length === 0 && gameState === LVL1 && checks === 0){
    var biggoop = new BigGoop();
    gameState = LVL1BOSS;
    boss = biggoop;
    isBoss = true;
    checks = 1;
  }

  if (boss != null){
    if(gameState === LVL1BOSS){
      checkBosses(false,false,biggoop,false,lvl1completed);
    }
  }

  if(goopAtks != null){
    if(plr.overlap(goopAtks)){
      plrHealth -= 1;
    }
  }

  if (gameState === LVL1BOSS){
    if (frameCount % 50 === 0){
      var randomnum = Math.round(random(1,3));
      if (randomnum === 1){
        boss.biggoop.changeAnimation("left");
        var atk = createSprite(width/2-40,height/2,30,height);
        atk.visible = false;
        goopAtks = atk;
      }
      if (randomnum === 2){
        boss.biggoop.changeAnimation("forward");
        var atk = createSprite(width/2,height/2,30,height);
        atk.visible = false;
        goopAtks = atk;
      }
      if (randomnum === 3){
        boss.biggoop.changeAnimation("right");
        var atk = createSprite(width/2+40,height/2,30,height);
        atk.visible = false;
        goopAtks = atk;
      }
    }
  }

  drawSprites();
}

function checkEnemies(fly,enemytype){
  if (enemies.length != 0){
    for (var i = 0; i < enemies.length; i++){
      if (enemies[i]){
        if (bullets != null){
          for (var x = 0; x < bullets.length; x++){
            if(enemytype.overlap(bullets[x])){
              enemies[i].health -= 1;
              bullets[x].destroy();
            }
          }
        }

        if (enemytype.position.x < plr.x){
          enemytype.velocityX = 1;
          enemytype.changeAnimation("right");
        }

        if (enemytype.position.x > plr.x){
          enemytype.velocityX = -1;
          enemytype.changeAnimation("left");
        }

        if (enemytype.position.x === plr.x){
          enemytype.velocityX = 0;
        }

        if(fly){
          if (enemytype.y < plr.y){
            enemytype.velocityY = 2;
          }
  
          if (enemytype.y > plr.y){
            enemytype.velocityY = -2;
          }
  
          if (enemytype.y === plr.y){
            enemytype.velocityY = 0;
          }
        }

        if (plr.overlap(enemytype)){
          if (gameState === LVL1){
            plrHealth -= 1;
          }
          if (gameState === LVL2){
            plrHealth -= 5;
          }
          if (gameState === LVL3){
            plrHealth -= 10;
          }
          if (gameState === LVL4){
            plrHealth -= 10;
          }
          if (gameState === LVL5){
            plrHealth -= 20;
          }
        }

        if(enemies[i].health <= 0 || isDead){
          enemytype.visible = false;
          enemytype.destroy();
          enemies.pop(enemies[i]);
        }
      }
    }
  }
}

function checkBosses(move,fly,bossType,deadlyTouch,completedfunction){
  if (boss != null){
      if (boss.bossType){
        if (bullets != null){
          for (var x = 0; x < bullets.length; x++){
            if(boss.bossType.overlap(bullets[x])){
              boss.health -= 1;
              bullets[x].destroy();
            }
          }
        }

        if(move){
          if (boss.bossType.x < plr.x){
            boss.bossType.velocityX = 2;
            boss.bossType.changeAnimation("right");
          }

          if (eboss.bossType.x > plr.x){
            boss.bossType.velocityX = -2;
            boss.bossType.changeAnimation("left");
          }

          if (boss.bossType.x === plr.x){
            boss.bossType.velocityX = 0;
          }
        }

        if(fly){
          if (boss.bossType.y < plr.y){
            boss.bossType.velocityY = 2;
          }
  
          if (boss.bossType.y > plr.y){
            boss.bossType.velocityY = -2;
          }
  
          if (boss.bossType.y === plr.y){
            boss.bossType.velocityY = 0;
          }
        }

        if (deadlyTouch){
        if (plr.overlap(boss.bossType)){
            if (gameState === LVL1){
              plrHealth -= 2;
            }
            if (gameState === LVL2){
              plrHealth -= 10;
            }
            if (gameState === LVL3){
              plrHealth -= 20;
            }
            if (gameState === LVL4){
              plrHealth -= 20;
            }
            if (gameState === LVL5){
              plrHealth -= 40;
            }
          }
        }

        if(boss.health <= 0 || isDead){
          boss.bossType.visible = false;
          boss.bossType.destroy();
          completedfunction();
        }
      }
    }
}

function shoot(){
  if(gameState != START && gameState != SELECT && gameState != PAUSE && gameState != END && plrHealth > 0){
    var bullet = new Bullet(direction);
  }
}

function moveUp(){
  if(gameState != START && gameState != SELECT && gameState != PAUSE && gameState != END && plr.y > height/2 && plrHealth > 0){
    plr.velocityY = -20;
  }
}

function moveLeft(){
  if(plr.x > 20 && gameState != START && gameState != SELECT && gameState != PAUSE && gameState != END && plrHealth > 0){
    plr.x -= 10;
    plr.changeImage("left");
    footsteps.play();
    direction = -1;
    plrBulletImg = plrBulletLeft;
  }
}

function moveRight(){
  if(plr.x < width-20 && gameState != START && gameState != SELECT && gameState != PAUSE && gameState != END && plrHealth > 0){
    plr.x += 10;
    plr.changeImage("right");
    footsteps.play();
    direction = 1;
    plrBulletImg = plrBulletRight;
  }
}

function playButtonPressed(){
  if (gameState === START){
    gameState = SELECT;
    playButton.hide();

    lvl2lock.visible = true;
    lvl3lock.visible = true;
    lvl4lock.visible = true;
    lvl5lock.visible = true;

    lvl1button.show();
  }
}

function lvl1Pressed(){
  if (gameState === SELECT || gameState === LVL1 || gameState === LVL1BOSS){
    gameState = LVL1;
    defaultbg = lvl1bg;
    isDead = false;
    isPlaying = true;
    plrHealth = 100;
    plr.x = 20;
    plr.y = height-30;
    if (isBoss){
      boss.biggoop.destroy();
      boss = null;
      isBoss = false;
    }

    lvl1button.hide();
    lvl2button.hide();
    lvl3button.hide();
    lvl4button.hide();
    lvl5button.hide();
    tryAgain.hide();
    lvl2lock.visible = false;
    lvl3lock.visible = false;
    lvl4lock.visible = false;
    lvl5lock.visible = false;
    left_arrow.show();
    right_arrow.show();
    shoot_button.show();
    jump_button.show();
    logo.visible = false;

    plr.visible = true;

    bg_mus.stop();
    lvl1mus.stop();
    lvl1mus.loop();

    for(var i = 0; i < 5; i++){
      var ranx = random(width/2,width);
      var goop = new Goop(ranx);

      goops.push(goop);
      enemies.push(goop);
    }
  }
}

function lvl1completed(){
  if (completed <= 1){
    completed = 1;
  }
  defaultbg = bgImg;
  isPlaying = false;

  lvl1button.show();
  lvl2button.show();
  left_arrow.hide();
  right_arrow.hide();
  shoot_button.hide();
  jump_button.hide();
  logo.visible = true;

  gameState = SELECT;

  lvl3lock.visible = true;
  lvl4lock.visible = true;
  lvl5lock.visible = true;

  boss = null;
  goopAtks = null;
  checks = 0;
  isPlaying = false;

  lvl1mus.stop();
  bg_mus.loop();
}

function lvl2Pressed(){
  if ((gameState === SELECT || gameState === LVL2 || gameState === LVL2BOSS) && completed >= 1){
    gameState = LVL2;
    defaultbg = lvl2bg;
    isDead = false;
    isPlaying = true;
    plrHealth = 100;
    plr.x = 20;
    plr.y = height-30;
    
    lvl1button.hide();
    lvl2button.hide();
    lvl3button.hide();
    lvl4button.hide();
    lvl5button.hide();
    tryAgain.hide();
    lvl3lock.visible = false;
    lvl4lock.visible = false;
    lvl5lock.visible = false;
    left_arrow.show();
    right_arrow.show();
    shoot_button.show();
    jump_button.show();
    logo.visible = true;

    plr.visible = true;

    bg_mus.stop();
    lvl2mus.stop();
    lvl2mus.loop();
  }
}

function lvl2completed(){
  if (completed <= 2){
    completed = 2;
  }
  defaultbg = bgImg;
  isPlaying = false;

  lvl1button.show();
  lvl2button.show();
  lvl3button.show();
  left_arrow.hide();
  right_arrow.hide();
  shoot_button.hide();
  jump_button.hide();
  logo.visible = true;

  lvl4lock.visible = true;
  lvl5lock.visible = true;

  boss = null;
  bossHealth = 0;
  checks = 0;
  isPlaying = false;

  lvl2mus.stop();
  bg_mus.loop();
}

function lvl3Pressed(){
  if ((gameState === SELECT || gameState === LVL3 || gameState === LVL3BOSS) && completed >= 2){
    gameState = LVL3;
    defaultbg = lvl3bg;
    isDead = false;
    isPlaying = true;
    plrHealth = 100;
    plr.x = 20;
    plr.y = height-30;
    
    lvl1button.hide();
    lvl2button.hide();
    lvl3button.hide();
    lvl4button.hide();
    tryAgain.hide();
    lvl2lock.visible = false;
    lvl3lock.visible = false;
    lvl4lock.visible = false;
    lvl5lock.visible = false;
    left_arrow.show();
    right_arrow.show();
    shoot_button.show();
    jump_button.show();
    logo.visible = false;

    plr.visible = true;

    bg_mus.stop();
    lvl3mus.stop();
    lvl3mus.loop();
  }
}

function lvl3completed(){
  if (completed <= 3){
    completed = 3;
  }
  defaultbg = bgImg;

  lvl1button.show();
  lvl2button.show();
  lvl3button.show();
  lvl4button.show();
  left_arrow.hide();
  right_arrow.hide();
  shoot_button.hide();
  jump_button.hide();
  logo.visible = true;

  lvl5lock.visible = true;

  boss = null;
  bossHealth = 0;
  checks = 0;
  isPlaying = false;

  lvl3mus.stop();
  bg_mus.loop();
}

function lvl4Pressed(){
  if ((gameState === SELECT || gameState === LVL4 || gameState === LVL4BOSS) && completed >= 3){
    gameState = LVL4;
    defaultbg = lvl4bg;
    isDead = false;
    isPlaying = true;
    plrHealth = 100;
    plr.x = 20;
    plr.y = height-30;
    
    lvl1button.hide();
    lvl2button.hide();
    lvl3button.hide();
    lvl4button.hide();
    lvl5button.hide();
    tryAgain.hide();
    lvl2lock.visible = false;
    lvl3lock.visible = false;
    lvl4lock.visible = false;
    lvl5lock.visible = false;
    left_arrow.show();
    right_arrow.show();
    shoot_button.show();
    jump_button.show();
    logo.visible = false;

    plr.visible = true;

    bg_mus.stop();
    lvl5mus.stop();
    lvl4mus.loop();
  }
}

function lvl4completed(){
  if (completed <= 4){
    completed = 4;
  }
  defaultbg = bgImg;
  isPlaying = false;

  lvl1button.show();
  lvl2button.show();
  lvl3button.show();
  lvl4button.show();
  lvl5button.show();
  left_arrow.hide();
  right_arrow.hide();
  shoot_button.hide();
  jump_button.hide();
  logo.visible = true;

  boss = null;
  bossHealth = 0;
  checks = 0;
  isPlaying = false;

  lvl4mus.stop();
  bg_mus.loop();
}

function lvl5Pressed(){
  if ((gameState === SELECT || gameState === LVL5 || gameState === LVL5BOSS) && completed >= 4){
    gameState = LVL5;
    defaultbg = lvl5bg;
    isDead = false;
    isPlaying = true;
    plrHealth = 100;
    plr.x = 20;
    plr.y = height-30;
    
    lvl1button.hide();
    lvl2button.hide();
    lvl3button.hide();
    lvl4button.hide();
    lvl5button.hide();
    tryAgain.hide();
    lvl2lock.visible = false;
    lvl3lock.visible = false;
    lvl4lock.visible = false;
    lvl5lock.visible = false;
    left_arrow.show();
    right_arrow.show();
    shoot_button.show();
    jump_button.show();
    logo.visible = false;

    plr.visible = true;

    bg_mus.stop();
    lvl5mus.stop();
    lvl5mus.loop();
  }
}

function lvl5completed(){
  if (completed <= 5){
    completed = 5;
  }
  defaultbg = bgImg;

  lvl1button.show();
  lvl2button.show();
  lvl3button.show();
  lvl4button.show();
  lvl5button.show();
  left_arrow.hide();
  right_arrow.hide();
  shoot_button.hide();
  jump_button.hide();
  logo.visible = true;

  boss = null;
  bossHealth = 0;
  checks = 0;
  isPlaying = false;

  lvl5mus.stop();
  bg_mus.loop();
}