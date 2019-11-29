class Spiller{
  constructor(x, y){
    this.x = width*0.125;
    this.y = height/2;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.radius = 40;
    this.speed = .8;
    this.brake = .3;
    this.farge = `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`;
    this.hudfarge = `rgb(${Math.floor(Math.random()+80*3.2)}, ${Math.floor(Math.random()+47*4)}, ${Math.floor(Math.random()+42*4.285)})`;
  }
  tegn(){
    rectMode(CENTER);
    fill(this.farge);
    rect(this.x, this.y, this.radius*0.6, this.radius*1.4)
    fill(this.hudfarge);
    circle(this.x, this.y, this.radius);
  }
  flytt(){
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    if(keyIsDown(87) && this.yVelocity > -5){
      this.yVelocity -= this.speed;
    }
    if(keyIsDown(83) && this.yVelocity < 5){
      this.yVelocity += this.speed;
    }
    if(keyIsDown(65) && this.xVelocity > -5){
      this.xVelocity -= this.speed;
    }
    if(keyIsDown(68) && this.xVelocity < 5){
      this.xVelocity += this.speed;
    }

    if(this.yVelocity > 0){
      this.yVelocity -= this.brake;
    }else if(this.yVelocity < 0){
      this.yVelocity += this.brake;
    }
    if(this.xVelocity > 0){
      this.xVelocity -= this.brake;
    }else if(this.xVelocity < 0){
      this.xVelocity += this.brake;
    }

    if (this.xVelocity < .4 && this.xVelocity > -.4){
      this.xVelocity = 0;
    }
    if (this.yVelocity < .4 && this.yVelocity > -.4){
      this.yVelocity = 0;
    }

    if(this.x + 14/2 + this.radius/2 > windowWidth){
      this.x = windowWidth - 14/2 - this.radius/2;
    }
    if(this.x - 14/2 - this.radius/2 < 0){
      this.x = 14/2 + this.radius/2;
    }
    if(this.y + this.radius/2 +14/2  > windowHeight){
      this.y = windowHeight - this.radius/2 - 14/2;
    }
    if(this.y - 14/2 - this.radius/2 < 0){
      this.y = 14/2 + this.radius/2;
    }
  }
  spis(){
    this.radius += 10;
  }
}
