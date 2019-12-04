
//maybe make freeze only store the number within array treasures that corresponds to the freeze items
//draw treasures after openitem

// 11-25 when the player presses Q or ALT on an spot, it disappears, except if it is on "special" spot everything disappears

// 11-30 maybe make an item that changes the board, maybe make drawSpecial into a if statement within drawTreasure

let treasures = [];
let special = [];
let freeze = [];
let dex = [];
let time;

function setup() {
  createCanvas(600, 600);
  background(255,225,185);
  player1 = new Avatar(random(50,550),random(50,550),4,0,'red',1,0)
  player2 = new Avatar(random(50,550),random(50,550),4,0,'blue',2,0)

  for(var i = 0; i < 46; i++){
    let wow = new Treasure(1)
    treasures.push(wow)
    dex.push(treasures.indexOf(wow))
  }

  for(var i = 0; i < 3; i++){
    let s = new Treasure(2)
    treasures.push(s)
    dex.push(treasures.indexOf(s))
  }

  treasures.push(new Treasure(3))
}

function draw(){
  background(255,225,185);
  // stroke(255,255,255)
  // line(player1.x, player1.y, player2.x, player2.y)
  player1.openItem()
  player2.openItem()

  for(var i = 0; i < treasures.length; i++){
    treasures[i].drawTreasure()
  }

  player1.drawMe()
  player1.moveMe()
  player2.drawMe()
  player2.moveMe()
  player1.collideMe()
  player2.collideMe()

  text('player 1: WASD Q',25,45)
  text('player 2: ARROWKEYS ALT', 25, 25)
  text('player 1',25,65)
  text(player1.x, 75,65)
  text(player1.y, 200,65)
  text('player2', 25,85)
  text(player2.x, 75,85)
  text(player2.y, 200, 85)
  fill('red')
  text(player1.point, 25,550)
  fill('blue')
  text(player2.point, 25, 580)

  // if(player1.point >= 10){
  //   fill('red')
  //   textSize(30)
  //   text('player 1 wins', width/2, height/2)
  //   player1.speed = 0
  //   player2.speed = 0
  // }
  //
  // if(player2.point >= 10){
  //   fill('blue')
  //   textSize(30)
  //   text('player 2 wins', width/2, height/2)
  //   player1.speed = 0
  //   player2.speed = 0
  // }
}

class Avatar {

	constructor(x,y, speed, score, color, player, point){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.score = score;
    this.color = color;
    this.player = player;
    this.point = point;
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

      // check for Player One gathering treasure
      if (keyIsDown(81) && this.player==1) {
        if ((abs(this.x - treasures[i].x)<=10) && (abs(this.y - treasures[i].y)<=10)) {
          time = frameCount
          if (treasures[i].type == 1) {
            this.point += 1;
            doSplice = 1;
          }
          if (treasures[i].type == 2) {
            this.speed += 2;
            doSplice = 1;
          }
          if(treasures[i].type == 3){
            player2.speed -= 4
            doSplice = 1;
          }
        }
      }

      // check for Player Two gathering treasure
      if (keyIsDown(18) && this.player==2) {
        if ((abs(this.x - treasures[i].x)<=10) && (abs(this.y - treasures[i].y)<=10)) {
          if (treasures[i].type == 1) {
            this.point += 1;
            doSplice = 1;
          }
          if (treasures[i].type == 2) {
            this.speed += 2;
            doSplice = 1;
          }
          if(treasures[i].type == 3){
            player1.speed -= 4
            doSplice = 1;
          }
        }
      }

      if (doSplice) {
        treasures.splice(i,1);
      }
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
