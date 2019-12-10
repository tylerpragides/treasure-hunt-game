
// 11-30 maybe make an item that changes the board

let treasures = [];
let bullets = [];
let fr = 60;
let stage = 0;
let testtest = [];

function setup() {

  createCanvas(600, 600);
  frameRate(fr);
  player1 = new Avatar(random(50,550),random(50,550),5,0,'red',1,0,0)
  player2 = new Avatar(random(50,550),random(50,550),3,0,'blue',2,0,0)

  for(var i = 0; i < 10; i++){
    let wow = new Treasure(1)
    treasures.push(wow)
  }

  for(var i = 0; i < 15; i++){
    let s = new Treasure(2)
    treasures.push(s)
  }

  treasures.push(new Treasure(3))

  // for(var i = 0; i < 75; i++){
  //   let bang = new Bullet
  //   bullets.push(bang)
  // }
}

function draw(){
  if(millis() < 5000){
    background(200)
    text('RED wins by collecting all the red points', width/2, height/2)
    text('BLUE wins by shooting red with mouse', width/2, height/2 + 30)
  } else {
    if(stage == 0){
      background(255,225,185)
    }
    if(stage == 1){
      background(200,220,255)
    }
    if(stage == 2){
      background(200)
      treasures.splice(0,treasures.length)
      fill('blue')
      text('BLUE WINS', width/2, height/2)
    }
    if(stage == 3){
      background(200)
      treasures.splice(0,treasures.length)
      fill('red')
      text('RED WINS', width/2, height/2)
    }
    // text(floor(millis()),100,100)
    for(var i = 0; i < treasures.length; i++){
      treasures[i].drawTreasure()
    }

    for(var o = 0; o < bullets.length; o++){
      bullets[o].drawBullet();
      bullets[o].moveBullet();
    }

    player2.shoot()
    player1.win2()
    player1.win1()

    player1.openItem()
    player2.openItem()
    player1.drawMe()
    player1.moveMe()
    player2.drawMe()
    player2.moveMe()
    player1.collideMe()
    player2.collideMe()

    fill('red')
    text(player1.point, 25,550)
    text('RED CONTROLS: WASD Q',25,50)
    fill('blue')
    text(player2.point, 25, 580)
    text('BLUE CONTROLS: ARROWKEYS MOUSE',25,80)
  }
}

class Avatar {

	constructor(x,y, speed, score, color, player, point, ang){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.score = score;
    this.color = color;
    this.player = player;
    this.point = point;
    this.ang = ang;
	}

	drawMe(){
    noStroke()
    fill(this.color)
    ellipse(this.x,this.y,20,20)
  }

	moveMe(){
    if (keyIsDown(UP_ARROW) && this.player == 2) {
       this.y -= this.speed;
    }

    if (keyIsDown(DOWN_ARROW) && this.player == 2) {
        this.y += this.speed;
    }

    if (keyIsDown(LEFT_ARROW) && this.player == 2) {
      this.x -= this.speed;
    }

    if (keyIsDown(RIGHT_ARROW) && this.player == 2) {
      this.x += this.speed;
    }
    if (keyIsDown(87) && this.player == 1) {
       this.y -= this.speed;
    }

    if (keyIsDown(83) && this.player == 1) {
        this.y += this.speed;
    }

    if (keyIsDown(65) && this.player == 1) {
      this.x -= this.speed;
    }

    if (keyIsDown(68) && this.player == 1) {
      this.x += this.speed;
    }

    // if (keyIsDown(16)){
    //   player1.speed = this.speed + 5
    // }
    // if (keyIsDown(16) == false){
    //   player1.speed = this.speed
    // }
	}

  collideMe(){
    if(this.x + 10 >= width){
      this.x = this.x - this.speed;
    }
    if(this.x - 10 <= 0){
      this.x = this.x + this.speed;
    }
    if(this.y - 10 <= 0){
      this.y = this.y + this.speed;
    }
    if(this.y + 10 >= height){
      this.y = this.y - this.speed;
    }
  }

  openItem(){
    for(var i = 0; i < treasures.length; i++) {
      var doSplice = 0;
      var wait = 0;
      var doneWaiting = 0;

      // check for Player One gathering treasure
      if (keyIsDown(81) && this.player==1) {
        if ((abs(this.x - treasures[i].x)<=10) && (abs(this.y - treasures[i].y)<=10)) {
          wait = 1;
          // doneWaiting = 1;
        }
      }

      if(wait == 1){
        angleMode(DEGREES)
        noFill()
        stroke(this.color)
        arc(this.x,this.y - 20,20,20,-1,this.ang*6)
        this.ang++
        if(this.ang*6 == 360){
          this.ang = 0;
          doneWaiting = 1;
        } else{
          doneWaiting = 0;
        }
      }

      if(doneWaiting == 1){
          if (treasures[i].type == 1) {
            this.point += 1;
            doSplice = 1;
          }
          if (treasures[i].type == 2) {
            this.speed += 2;
            doSplice = 1;
          }
          if (treasures[i].type == 3) {
            for(var t = 0; t < 360; t++){
              stage = 1;
            }
          }
        if(doSplice){
          treasures.splice(i,1);
        }
      }
    }
  }
  shoot(){
    if(mouseIsPressed){
      bullets.push(new Bullet(this.x,this.y))
      if(bullets.length >= 50){
        let starttime = new Date().getTime()
        let stoptime = starttime + 5000
        testtest.push(starttime);
        console.log(starttime)
        for(var s = starttime; s < stoptime; s++){
          bullets.splice(0,treasures.length)
        }
      }
    }
  }
  win2(){
    for(var b = 0; b < bullets.length; b++){
      if ((abs(this.x - bullets[b].x)<=5) && (abs(this.y - bullets[b].y)<=5)) {
        this.speed = 0;
        stage = 2;
      }
    }
  }
  win1(){
    if(player1.point >= 10){
      player2.speed = 0;
      stage = 3;
    }
  }
}

class Treasure {
  constructor(type){
    this.x = random(20,580);
    this.y = random(20,580);
    this.type = type;
  }

  drawTreasure(){
    if(this.type == 1){
      stroke(255,0,0)
      strokeWeight(2)
      line(this.x-10, this.y-10, this.x+10, this.y+10)
      line(this.x+10, this.y-10, this.x-10, this.y+10)
    }
    if(this.type == 2){
      noStroke()
      fill(0,120,0)
      rect(this.x-10, this.y-10, 20, 20)
    }
    if(this.type == 3){
      fill(150,0,150)
      triangle(this.x-10, this.y+10, this.x, this.y-10, this.x+10,this.y+10)
    }
  }
}

class Bullet {
  constructor(playerx, playery){
    angleMode(DEGREES)
    this.angleToMouse = Math.atan2(mouseY - playery, mouseX - playerx);
    let initialVelocity = 7;
    this.bulletxspeed = Math.cos(this.angleToMouse) * initialVelocity
    this.bulletyspeed = Math.sin(this.angleToMouse) * initialVelocity
    this.x = playerx;
    this.y = playery;
  }

  drawBullet(){
    fill(155,155,255)
    ellipse(this.x, this.y, 10,10)
  }

  moveBullet(){
    this.x += this.bulletxspeed
    this.y += this.bulletyspeed
  }
}
