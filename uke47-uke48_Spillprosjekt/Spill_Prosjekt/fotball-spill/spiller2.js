class Spiller2{
  constructor(x, y){
    this.x = width*0.875;
    this.y = height/2;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.radius = 40;
    this.speed = .8; // .5?
    this.brake = .3; // .15?
    this.farge = `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`;
    this.hudfarge = `rgb(89, 47, 42)`;
    this.snu = 0;
  }
  tegn(){
    push();
      fill(this.farge);
      translate(this.x, this.y);
      rotate(this.snu);
      rectMode(CENTER);
      rect(0, 0, this.radius*0.6, this.radius*1.4);

      /*Når jeg trykker en knapp snur den seg til posisjonen knappen befinner seg
      if(keyIsDown(38) && this.snu != 90 && this.snu < 90){
        this.snu = this.snu + 2;
      }else if(keyIsDown(38) && this.snu != 90 && this.snu > 90){
        this.snu = this.snu - 2;
      }

      if(keyIsDown(40) && this.snu != -90 && this.snu > -90){
        this.snu = this.snu - 2;
      }else if(keyIsDown(40) && this.snu != -90 && this.snu < -90){
        this.snu = this.snu + 2;
      }

      if(keyIsDown(37) && this.snu != 0 && this.snu > 0){
        this.snu = this.snu - 2;
      } else if(keyIsDown(37) && this.snu != 0 && this.snu < 0){
        this.snu = this.snu + 2;
      }

      if(keyIsDown(39) && this.snu != 180 && this.snu < 180){
        this.snu = this.snu + 2;
      }else if(keyIsDown(39) && this.snu != 180 && this.snu > 180){
        this.snu = this.snu - 2;
      }
      */

    pop();
    fill(this.hudfarge);
    circle(this.x, this.y, this.radius);
  }
  flytt(){
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    if(keyIsDown(38) && this.yVelocity > -5){
      this.yVelocity -= this.speed;
    }
    if(keyIsDown(40) && this.yVelocity < 5){
      this.yVelocity += this.speed;
    }
    if(keyIsDown(37) && this.xVelocity > -5){
      this.xVelocity -= this.speed;
    }
    if(keyIsDown(39) && this.xVelocity < 5){
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

    if (this.xVelocity < .4 && this.xVelocity > -.4){ //.2?
      this.xVelocity = 0;
    }
    if (this.yVelocity < .4 && this.yVelocity > -.4){ // .2?
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
