class Fotball{
  constructor(x, y){
    this.x = width/2;
    this.y = height/2;
    this.radius = 30;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.kick = .5;
    this.brake = .15;
    this.farge = `white`;
  }
  tegn(){
    fill(this.farge);
    circle(this.x, this.y, this.radius);
    //imageMode(CENTER);
    //image(fotball, this.x, this.y, this.radius, this.radius);
  }
  changeColorP1(){
    this.farge = player1.farge;
    fill(this.farge);
  }
  changeColorP2(){
    this.farge = player2.farge;
    fill(this.farge);
  }
  flytt(){
    if(this.farge == player1.farge){
      prosentPlayer1 += 1;
      if(this.x + windowWidth*0.04 + this.radius > windowWidth){
        if(this.farge == player1.farge){
          missedShots1 += 1;
        }
        this.kick = 0;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.x = windowWidth/2;
        this.y = windowHeight/2;
        this.farge = "white";
        midCircle.farge = player2.farge;
      }
      if(this.x - windowWidth*0.04 - this.radius < 0){
        this.kick = 0;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.x =  windowWidth/2;
        this.y = windowHeight/2;
        this.farge = "white";
        midCircle.farge = player2.farge;
      }
      if(this.y + this.radius > windowHeight){
        this.kick = 0;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.x = windowWidth/2;
        this.y = windowHeight/2;
        this.farge = "white";
        midCircle.farge = player2.farge;
      }
      if(this.y - this.radius < 0){
        this.kick = 0;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.x = windowWidth/2;
        this.y = windowHeight/2;
        this.farge = "white";
        midCircle.farge = player2.farge;
      }
    }
    else if(this.farge == player2.farge){
      prosentPlayer2 += 1;
      if(this.x + windowWidth*0.04 + this.radius > windowWidth){
        this.kick = 0;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.x = windowWidth/2;
        this.y = windowHeight/2;
        this.farge = "white";
        midCircle.farge = player1.farge;
      }
      if(this.x - windowWidth*0.04 - this.radius < 0){
        if(this.farge == player2.farge){
          missedShots2 += 1;
        }
        this.kick = 0;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.x = windowWidth/2;
        this.y = windowHeight/2;
        this.farge = "white";
        midCircle.farge = player1.farge;
      }
      if(this.y + this.radius > windowHeight){
        this.kick = 0;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.x = windowWidth/2;
        this.y = windowHeight/2;
        this.farge = "white";
        midCircle.farge = player1.farge;
      }
      if(this.y - this.radius < 0){
        this.kick = 0;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.x = windowWidth/2;
        this.y = windowHeight/2;
        this.farge = "white";
        midCircle.farge = player1.farge;
      }
    }

    this.x += this.xVelocity;
    this.y += this.yVelocity;

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

    if (this.xVelocity < .2 && this.xVelocity > -.2){
      this.xVelocity = 0;
    }
    if (this.yVelocity < .2 && this.yVelocity > -.2){
      this.yVelocity = 0;
    }
  }
  flytt1(){
    if(this.y == windowHeight/2 && this.x == windowWidth/2 && midCircle.farge == player2.farge){
      console.log("fotball kan ikke beveges av spiller1");
    }else{
      this.changeColorP1();
      midCircle.farge = `#2bab18`;

      this.x += this.xVelocity;
      this.y += this.yVelocity;
      player1.x += player1.xVelocity;
      player1.y += player1.yVelocity;

      let dx = player1.x - this.x;
      let dy = player1.y - this.y;

      let angle = atan2(dy, dx);
      let minDist = (player1.radius-player1.radius/2 + this.radius-this.radius/2);

      let targetX = this.x + cos(angle) * minDist;
      let targetY = this.y + sin(angle) * minDist;
      let ax = (targetX - player1.x);
      let ay = (targetY - player1.y);
      this.xVelocity -= ax*0.7;
      this.yVelocity -= ay*0.7;
      player1.xVelocity += ax*0.5;
      player1.yVelocity += ay*0.5;
    }
  }
  flytt2(){


    if(this.y == windowHeight/2 && this.x == windowWidth/2 && midCircle.farge == player1.farge){
      console.log("Fotball kan ikke beveges av player2");
    }else{
      this.changeColorP2();
      midCircle.farge = `#2bab18`;

      this.x += this.xVelocity;
      this.y += this.yVelocity;
      player2.x += player2.xVelocity;
      player2.y += player2.yVelocity;

      let dx = player2.x - this.x;
      let dy = player2.y - this.y;

      let angle = atan2(dy, dx);
      let minDist = (player2.radius-player2.radius/2 + this.radius- this.radius/2);

      let targetX = this.x + cos(angle) * minDist;
      let targetY = this.y + sin(angle) * minDist;
      let ax = (targetX - player2.x);
      let ay = (targetY - player2.y);
      this.xVelocity -= ax*0.7;
      this.yVelocity -= ay*0.7;
      player2.xVelocity += ax*0.5;
      player2.yVelocity += ay*0.5;
    }
  }
}
