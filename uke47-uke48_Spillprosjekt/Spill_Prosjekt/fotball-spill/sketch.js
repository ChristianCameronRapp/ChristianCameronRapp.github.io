let player1;
let player2;
let matbiter = [];
let matbiter2 = [];

let forceAll = 0.9;
let force1 = 1;
let force2 = 1;
let boostR = 10;
let boostR2 = 10;

let timerStart = 99;

let player1Points;
let player2Points;

let prosentPlayerAllCalculated = 0;
let prosentPlayer1 = 0;
let prosentPlayer1Full = 0;
let prosentPlayer1Calculated = 0;
let prosentPlayer2 = 0;
let prosentPlayer2Full = 0;
let prosentPlayer2Calculated = 0;

let missedShots1 = 0;
let missedShots2 = 0;
let missedShots1Plus = 0;
let missedShots2Plus = 0;

let accuracy1 = 0;
let accuracy2 = 0;
let accuracy1Plus = 0;
let accuracy2Plus = 0;


function preload(){
  expand = loadImage("expand0.png");
  strong = loadImage("strong2.png");
  fotball = loadImage("fotball-bilde.png");
  font = loadFont("../fotball-spill/Teko/Teko-Bold.ttf");
  soundFormats('mp3');
  themeSong = loadSound("../UEFA - Champions League Anthem (Belmin Kuburas Remix).mp3");
}

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  themeSong.setVolume(1);
  themeSong.play();
  angleMode(DEGREES);
  frameRate(144);
  player1 = new Spiller(100, 100);
  player2 = new Spiller2(100, 100);
  fotball = new Fotball(100, 100);
  midCircle = new MidCircle(100, 100);
  fotballMaal = new FotballMaal(100, 100);

  player1Points = 0;
  player2Points = 0;
}

function draw() {
  //Lager Spill-banen
  background("#248017");
  fill("#2bab18");
  stroke("white");
  strokeWeight(5);
  rect(windowWidth/2, windowHeight/2, windowWidth*0.85, windowHeight*0.9);
  line(windowWidth/2, windowHeight*0.055, windowWidth/2, windowHeight*0.945);

  rect(windowWidth*0.125, windowHeight/2, windowWidth*0.1, windowHeight*0.4);
  rect(windowWidth*0.875, windowHeight/2, windowWidth*0.1, windowHeight*0.4);

  fotballMaal.tegn();



  midCircle.tegn();

  strokeWeight(14);
  line(0, 0, windowWidth, 0);
  line(0, 0, 0, windowHeight);
  line(windowWidth, 0, windowWidth, windowHeight);
  line(0, windowHeight, windowWidth, windowHeight);

  if(fotball.x > fotballMaal.x1 - fotballMaal.bredde/2 && fotball.x < fotballMaal.x1 + fotballMaal.bredde - fotballMaal.bredde/2 && fotball.y > fotballMaal.y - fotballMaal.lengde/2 && fotball.y < fotballMaal.y + fotballMaal.lengde - fotballMaal.lengde/2){
    player2Points++;
    console.log("ballen er i 1. firkanten");
    fotball.kick = 0;
    fotball.xVelocity = 0;
    fotball.yVelocity = 0;
    fotball.x = windowWidth/2;
    fotball.y = windowHeight/2;
    fotball.farge = "white";
    midCircle.farge = player1.farge;
    player1.x = width*0.125;
    player1.y = height/2;
    player2.x = width*0.875;
    player2.y = height/2;
    player1.radius = 40;
    player2.radius = 40;
    player1.xVelocity = 0;
    player1.yVelocity = 0;
    player2.xVelocity = 0;
    player2.yVelocity = 0;
    force1 = 1;
    force2 = 1;
  }
  else if(fotball.x > fotballMaal.x2 - fotballMaal.bredde/2 && fotball.x < fotballMaal.x2 + fotballMaal.bredde - fotballMaal.bredde/2 && fotball.y > fotballMaal.y - fotballMaal.lengde/2 && fotball.y < fotballMaal.y + fotballMaal.lengde - fotballMaal.lengde/2){
    player1Points++;
    console.log("ballen er i 2. firkanten");
    fotball.kick = 0;
    fotball.xVelocity = 0;
    fotball.yVelocity = 0;
    fotball.x = windowWidth/2;
    fotball.y = windowHeight/2;
    fotball.farge = "white";
    midCircle.farge = player2.farge;
    player1.x = width*0.125;
    player1.y = height/2;
    player2.x = width*0.875;
    player2.y = height/2;
    player1.radius = 40;
    player2.radius = 40;
    player1.xVelocity = 0;
    player1.yVelocity = 0;
    player2.xVelocity = 0;
    player2.yVelocity = 0;
    force1 = 1;
    force2 = 1;
  }

  if(timerStart <= 0){
    console.log("Timer er ferdig");
    timerStart = 0;
    fotball.xVelocity = 0;
    fotball.yVelocity = 0;
    fotball.kick = 0;
    background("rgba(0,0,0,0.95)");
    textSize(height/5);
    fill("white");
    stroke("black");
    strokeWeight(3);
    if(player1Points > player2Points){
      fill(player1.farge);
      text("PLAYER 1 WON", width/2, height/3);
    }else if(player1Points < player2Points){
      fill(player2.farge);
      text("PLAYER 2 WON", width/2, height/3);
    }else{
      fill("white");
      text("TIED", width/2, height/3);
    }


    //Poengscore etter match
    fill("white");
    text("-", width/2, height*0.565);
    strokeWeight(3);
    stroke("black");
    textSize(height/7.5);
    textAlign(CENTER);
    textFont(font);
    fill(player1.farge);
    text(player1Points, width/2 * 0.8 , height/2-height/2*-0.085);
    textSize(height/15);
    prosentPlayerAllCalculated = prosentPlayer1+prosentPlayer2;
    prosentPlayer1Calculated = round(prosentPlayer1*100/prosentPlayerAllCalculated);
    if(prosentPlayer1Full == prosentPlayer1Calculated){
      prosentPlayer1Full = prosentPlayer1Calculated;
    }else if(prosentPlayer1 == 0){
      prosentPlayer1Calculated = 0 + "%";
    }else{
      prosentPlayer1Full += 1;
    }
    accuracy1Calculated = missedShots1+player1Points;
    accuracy1 = round(player1Points*100/accuracy1Calculated);
    if(player1Points == 0){
      accuracy1 = 0;
    }
    if(accuracy1Plus == accuracy1){
      accuracy1Plus = accuracy1;
    }else{
      accuracy1Plus += 1;
    }

    if(missedShots1Plus >= missedShots1){
      missedShots1Plus = missedShots1
    }else{
      missedShots1Plus += 0.1;
    }
    text(prosentPlayer1Full + "%", width/2 * 0.8, height*0.625);
    text(accuracy1Plus + "%", width/2*0.8, height*0.7);
    text(round(missedShots1Plus), width/2*0.8, height*0.774);

    fill(player2.farge);
    textSize(height/7.5);
    text(player2Points, width/2 * 1.2 , height/2-height/2*-0.085);
    textSize(height/15);
    prosentPlayer2Calculated = round(prosentPlayer2*100/prosentPlayerAllCalculated);
    if(prosentPlayer2Full == prosentPlayer2Calculated){
      prosentPlayer2Full = prosentPlayer2Calculated;
    }else if(prosentPlayer2 == 0){
      prosentPlayer2Calculated = 0 + "%";
    }else{
      prosentPlayer2Full += 1;
    }
    accuracy2Calculated = missedShots2+player2Points;
    accuracy2 = round(player2Points*100/accuracy2Calculated);
    if(player2Points == 0){
      accuracy2 = 0;
    }
    if(accuracy2Plus == accuracy2){
      accuracy2Plus = accuracy2;
    }else{
      accuracy2Plus += 1;
    }

    if(missedShots2Plus >= missedShots2){
      missedShots2Plus = missedShots2
    }else{
      missedShots2Plus += 0.1;
    }
    text(prosentPlayer2Full + "%", width/2 * 1.2, height*0.625);
    text(accuracy2Plus + "%", width/2*1.2, height*0.7);
    text(round(missedShots2Plus), width/2*1.2, height*0.774);

    textSize(height/25);
    fill("white");
    text("POSSESSION", width/2, height*0.619);
    text("ACCURACY", width/2, height*0.693);
    text("MISSED SHOTS", width/2, height*0.767);
  }else{
    //Timer
    timerStart -= .1/6;

    fill("white");
    strokeWeight(0);
    rect(width/2, height/9.5, width/15, height/9);
    fill("white");
    strokeWeight(3);
    stroke("black");
    textSize(height/10);
    text(round(timerStart), width/2, height/7.25);

    //BOOST P1
    strokeWeight(5);
    stroke("white");
    fill(player1.farge);
    rect(fotballMaal.x1, fotballMaal.y, fotballMaal.bredde, boostR);
    if(boostR >= fotballMaal.lengde && keyIsDown(16)){
      player1.speed *= 1.3;
      player1.xVelocity *= 1.5;
      player1.yVelocity *= 1.5;
      /*stroke(player1.farge);
      strokeWeight(10);
      player1.flytt();
      rectMode(CENTER);
      fill(player1.farge);
      rect(player1.x, player1.y, player1.radius*0.6, player1.radius*1.4)
      circle(player1.x, player1.y, player1.radius);*/
      timer += 0.1;
      console.log(timer);
      if(timer >= 0.4){
        boostR = 0;
      }
    }else if(boostR < fotballMaal.lengde){
      boostR += width/1500;
      timer = 0;
      player1.speed = .8;
    }
    if(boostR == 0){
      player1.xVelocity /= 2;
      player1.yVelocity /= 2;
    }

    //BOOST P2
    strokeWeight(5);
    stroke("white");
    fill(player2.farge);
    rect(fotballMaal.x2, fotballMaal.y, fotballMaal.bredde, boostR2);
    if(boostR2 >= fotballMaal.lengde && keyIsDown(17) || boostR2 >= fotballMaal.lengde && keyIsDown(33)){
      player2.speed *= 1.3;
      player2.xVelocity *= 1.5;
      player2.yVelocity *= 1.5;
      /*stroke(player2.farge);
      strokeWeight(10);
      player2.flytt();
      rectMode(CENTER);
      fill(player1.farge);
      rect(player2.x, player2.y, player2.radius*0.6, player2.radius*1.4)
      circle(player2.x, player2.y, player2.radius);*/
      timer2 += 0.1;
      console.log(timer);
      if(timer2 >= 0.4){
        boostR2 = 0;
      }
    }else if(boostR2 < fotballMaal.lengde){
      boostR2 += width/1500;
      timer2 = 0;
      player2.speed = .8;
    }
    if(boostR2 == 0){
      player2.xVelocity /= 2;
      player2.yVelocity /= 2;
    }

    //Poengscore
    fill("white");
    strokeWeight(0);
    stroke("black");
    textSize(height/7.5);
    textAlign(CENTER);
    textFont(font);
    text(player1Points, width/2 * 0.8 , height/2-height/2*-0.085)//.style('font-family', 'Fjalla One, sans-serif');
    text(player2Points, width/2 * 1.2 , height/2-height/2*-0.085)//.style('font-family', 'Fjalla One, sans-serif');

    stroke("black");
    strokeWeight(.9);

    let avstandMidCircle1 = dist(player1.x, player1.y, midCircle.x, midCircle.y);
    let avstandMidCircle2 = dist(player2.x, player2.y, midCircle.x, midCircle.y);
    if(avstandMidCircle1 < (player1.radius-player1.radius/2 + midCircle.radius - midCircle.radius/2) && midCircle.farge == player2.farge){
      let dx = player1.x - midCircle.x;
      let dy = player1.y - midCircle.y;

      let angle = atan2(dy, dx);
      let minDist = (player1.radius-player1.radius/2 + midCircle.radius - midCircle.radius/2);

      let targetX = midCircle.x + cos(angle) * minDist;
      let targetY = midCircle.y + sin(angle) * minDist;
      let ax = (targetX - player1.x);
      let ay = (targetY - player1.y);
      player1.xVelocity += ax/1.5;
      player1.yVelocity += ay/1.5;
    }
    else if(avstandMidCircle2 < (player2.radius-player2.radius/2 + midCircle.radius - midCircle.radius/2) && midCircle.farge == player1.farge){
      let dx = player2.x - midCircle.x;
      let dy = player2.y - midCircle.y;

      let angle = atan2(dy, dx);
      let minDist = (player2.radius-player2.radius/2 + midCircle.radius - midCircle.radius/2);

      let targetX = midCircle.x + cos(angle) * minDist;
      let targetY = midCircle.y + sin(angle) * minDist;
      let ax = (targetX - player2.x);
      let ay = (targetY - player2.y);
      player2.xVelocity += ax/1.5;
      player2.yVelocity += ay/1.5;
    }

    let avstandFotball1 = dist(player1.x, player1.y, fotball.x, fotball.y);
    let avstandFotball2 = dist(player2.x, player2.y, fotball.x, fotball.y);
    if(avstandFotball1 < (player1.radius-player1.radius/2 + fotball.radius-fotball.radius/2)){
      fotball.flytt1();
    }
    else if(avstandFotball2 < (player2.radius-player2.radius/2 + fotball.radius-fotball.radius/2)){
      fotball.flytt2();
    }
    fotball.flytt();
    fotball.tegn();

    for(i = matbiter.length - 1; i > 0; i -= 1){
      matbiter[i].tegn();
      let avstandSteroider1 = dist(player1.x, player1.y, matbiter[i].x, matbiter[i].y);
      let avstandSteroider2 = dist(player2.x, player2.y, matbiter[i].x, matbiter[i].y);
      if(avstandSteroider1 < (player1.radius-player1.radius/2 + matbiter[i].radius-matbiter[i].radius/2)){
        if(player1.radius > 100){
          console.log("Kan ikke spise mer");
        }else{
          player1.spis();
        }
        matbiter.splice(i, 1);
      }
      else if(avstandSteroider2 < (player2.radius-player2.radius/2 + matbiter[i].radius-matbiter[i].radius/2)){
        if(player2.radius > 100){
          console.log("Kan ikke spise mer");
        }else{
          player2.spis();
        }
        matbiter.splice(i, 1);
      }
    }
    for(i = matbiter2.length - 1; i > 0; i -= 1){
      matbiter2[i].tegn();
      let avstandFart1 = dist(player1.x, player1.y, matbiter2[i].x, matbiter2[i].y);
      let avstandFart2 = dist(player2.x, player2.y, matbiter2[i].x, matbiter2[i].y);
      if(avstandFart1 < (player1.radius-player1.radius/2 + matbiter2[i].radius-matbiter2[i].radius/2)){
        force2 = force2 + 0.5;
        matbiter2.splice(i, 1);
      }
      else if(avstandFart2 < (player2.radius-player2.radius/2 + matbiter2[i].radius-matbiter2[i].radius/2)){
        force1 = force1 + 0.5;
        matbiter2.splice(i, 1);
      }
    }

    let avstandSpiller1 = dist(player1.x, player1.y, player2.x, player2.y);
    let avstandSpiller2 = dist(player2.x, player2.y, player1.x, player1.y);
    if(avstandSpiller1 < (player1.radius-player1.radius/2 + player2.radius-player2.radius/2)){
      kollisjon();
    }

    strokeWeight(.9);
    player1.flytt();
    player1.tegn();

    player2.flytt();
    player2.tegn();

    if(frameCount % 700 === 0){
      matbiter.push(new Matbit());
    }
    if(frameCount % 900 === 0){
      matbiter2.push(new Matbit2());
    }
  }
}

function kollisjon(){
  //Noe av kodingen er funnet på nettet, cos() og sin()
  player1.x += player1.xVelocity;
  player1.y += player1.yVelocity;
  player2.x += player2.xVelocity;
  player2.y += player2.yVelocity;

  let dx = player2.x - player1.x;
  let dy = player2.y - player1.y;

  let angle = atan2(dy, dx);
  let minDist = (player1.radius-player1.radius/2 + player2.radius-player2.radius/2);

  let targetX = player1.x + cos(angle) * minDist;
  let targetY = player1.y + sin(angle) * minDist;
  let ax = (targetX - player2.x) * forceAll;
  let ay = (targetY - player2.y) * forceAll;
  player1.xVelocity -= ax * force1;
  player1.yVelocity -= ay * force1;
  player2.xVelocity += ax * force2;
  player2.yVelocity += ay * force2;
}
