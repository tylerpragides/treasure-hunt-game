
//maybe make freeze only store the number within array treasures that corresponds to the freeze items

let treasures = [];
let test123;
let freeze = [];

function setup() {
  test123 = 'red'
  createCanvas(600, 600);
  background(255,225,185);
  player1 = new Avatar(random(50,550),random(50,550),3,0,'red',1)
  player2 = new Avatar(random(50,550),random(50,550),3,0,'blue',2)

  for(var i = 0; i < 10; i++){
    let wow = new Treasure()
    treasures.push(wow)
  }
  for(var p = 0; p < 1; p++){
    freeze.push(treasures[int(random(0,treasures.length))])
    console.log(freeze)
  }
}

function draw(){
  background(255,225,185);
  for(var i = 0; i < treasures.length; i++){
    stroke(test123)
    treasures[i].drawTreasure();
}

  player1.drawMe()
  player1.moveMe()
  player2.drawMe()
  player2.moveMe()
  player1.collideMe()
  player2.collideMe()
  player1.openItem()
  player2.openItem()
  text('player 1: WASD Q',25,45)
  text('player 2: ARROWKEYS ALT', 25, 25)
  text('player 1',25,65)
  text(player1.x, 75,65)
  text(player1.y, 200,65)
  text('player2', 25,85)
  text(player2.x, 75,85)
  text(player2.y, 200, 85)
}

class Avatar {

	constructor(x,y, speed, score, color, player){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.score = score;
    this.color = color;
    this.player = player;
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


    if(keyIsDown(81) == true && this.player == 1 && player1.x <= freeze[0].x + 10 && player1.x >= freeze[0].x -10 && player1.y <= freeze[0].y + 10 && player1.y >= freeze[0].y - 10){
      player2.speed = 0;
      test123 = 'green'
    }
    if(keyIsDown(81) == false && this.player == 1){
      player2.speed = 4;
    }
    if(player1.x >= freeze[0].x + 10 || player1.x <= freeze[0].x -10 || player1.y >= freeze[0].y + 10 || player1.y <= freeze[0].y - 10){
      if(this.player == 1){
        player2.speed = 4;
      }
    }
    if(keyIsDown(18) == true && this.player == 2 && player2.x <= freeze[0].x + 10 && player2.x >= freeze[0].x -10 && player2.y <= freeze[0].y + 10 && player2.y >= freeze[0].y - 10){
      player1.speed = 0;
      test123 = 'green'
    }
    if(keyIsDown(18) == false && this.player == 2){
      player1.speed = 4;
    }
    if(player2.x >= freeze[0].x + 10 || player2.x <= freeze[0].x -10 || player2.y >= freeze[0].y + 10 || player2.y <= freeze[0].y - 10){
      if(this.player == 2){
        player1.speed = 4;
      }
    }
}
}

class Treasure {
  constructor(){
    this.x = random(20,580);
    this.y = random(20,580);

  }

  drawTreasure(){
    // stroke(test123)
    strokeWeight(2)
    fill(255,0,0)
    line(this.x - 10, this.y - 10, this.x + 10, this.y + 10)
    line(this.x - 10, this.y + 10, this.x + 10, this.y - 10)
  }
}
