
// 11-30 maybe make an item that changes the board

let treasures = [];
let fr = 60;
let ang = 0;


function setup() {
  createCanvas(600, 600);
  frameRate(fr);
  background(255,225,185);

  // create the two players
  player1 = new Avatar(random(50,550),random(50,550),4,0,'red',1,0)
  player2 = new Avatar(random(50,550),random(50,550),4,0,'blue',2,0)

  // set the opponent for each player
  player1.setOpponent(player2);
  player2.setOpponent(player1);

  for(var i = 0; i < 15; i++){
    let coin = new Treasure(0)
    treasures.push(coin)
  }

  for(var i = 0; i < 15; i++){
    let speed = new Treasure(1)
    treasures.push(speed)
  }

  for(var i = 0; i < 10; i++){
    let slow = new Treasure(2)
    treasures.push(slow)
  }
}

function draw(){
  background(255,225,185);
  for(var i = 0; i < treasures.length; i++){
    treasures[i].drawTreasure()
  }

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
  fill('blue')
  text(player2.point, 25, 580)
}

class Avatar {

	constructor(x,y, speed, score, color, player, point){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.score = score;
    this.color = color;
    this.player = player;  // player 1 or 2
    this.point = point;
    this.opponent = null;           // pointer to the opponent (2 players total)
    this.waitingForTreasure = null; // pointer tot the Treasure found
	}

  setOpponent(player) {
    this.opponent = player;
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
      var wait = 0;         // if 1, we need to wait fot the treasure
      var doneWaiting = 1;  // if 1, we are done waiting for the treasure

      // check for Player One gathering treasure
      if (keyIsDown(81) && this.player==1) {
        if ((abs(this.x - treasures[i].x)<=10) && (abs(this.y - treasures[i].y)<=10)) {
          doSplice = 1;
          wait = 1;
          doneWaiting = 0;
        }
      }

      // check for Player Two gathering treasure
      if (keyIsDown(18) && this.player==2) {
        if ((abs(this.x - treasures[i].x)<=10) && (abs(this.y - treasures[i].y)<=10)) {
          wait = 1;
          if (treasures[i].type == 0) {
            this.point += 1;
            doSplice = 1;
          }
          if (treasures[i].type == 1) {
            this.speed += 2;
            doSplice = 1;
          }
          if(treasures[i].type == 2){
            player1.speed -= 3
            doSplice = 1;
          }
        }
      }

      if(wait == 1){
        var mult = 1;
        angleMode(DEGREES)
        noFill()
        stroke(255,0,0)
        if(treasures[i].type == 0){
          mult = 1;
        }
        if(treasures[i].type == 1){
          mult = 3;
        }
        if(treasures[i].type == 2){
          mult = 6;
        }
        arc(player1.x,player1.y - 20,20,20,0,ang*mult)
        ang++
        if(ang*mult == 360){
          ang = 0;
          doneWaiting = 0;
        } else{
          doneWaiting = 1;
        }
      }

      if (doneWaiting == 0) {
          let currentType = treasures[i].type;
          this.point += treasures[i].myPointChange[currentType];
          this.speed += treasures[i].mySpeedChange[currentType];
          this.opponent.speed += treasures[i].opponentSpeedChange[currentType];

        if (doSplice) {
          treasures.splice(i,1);
        }
      }
    }
  }
}

class Treasure {
  constructor(type){
    this.x = random(20,580);
    this.y = random(20,580);
    this.type = type;
    this.myPointChange = [1, 0, 0];
    this.mySpeedChange = [1, 2, 0];
    this.opponentSpeedChange = [0, 0, -3];
  }

  drawTreasure(){
    if(this.type == 0){
      stroke(255,0,0)
      strokeWeight(2)
      line(this.x-10, this.y-10, this.x+10, this.y+10)
      line(this.x+10, this.y-10, this.x-10, this.y+10)
    }
    if(this.type == 1){
      noStroke()
      fill(0,120,0)
      rect(this.x-10, this.y-10, 20, 20)
    }
    if(this.type == 2){
      fill(150,0,150)
      triangle(this.x-10, this.y+10, this.x, this.y-10, this.x+10,this.y+10)
    }
  }
}
