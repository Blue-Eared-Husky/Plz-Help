class EnemyBullet{
    constructor(dirY,bulletclass,bulletImage){
        this.bullet = createSprite(boss.x,boss.y,10,10);
        this.bullet.addAnimation("bullet",bulletImage);
        this.bullet.velocityY = dirY * 10;
        this.bullet.lifetime = 5000;
        this.bullet.scale = 2;
        this.bullet.setCollider("circle",0,0,2.5);

        bulletclass.push(this.bullet);
        enemies.push(this.bullet);
        bulletmus.play();
    }
}