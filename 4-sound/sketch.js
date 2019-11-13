//create an empty array called balls
let balls = [];

//create a variable to hold your avatar
let me;

let mySound;

var bouncing = false;

function preload() {
  soundFormats('mp3', 'ogg', 'wav');
  mySound = loadSound('burp.wav');
}

function setup() {
  createCanvas(500, 400);
  background(220);

  //make one avatar called me
  me = new Avatar(width/2, 300, 3, 0, 1);

}

function draw(){

  me.drawMe();
  me.moveMe();

  if (frameCount % 25 == 0) {
      let  b = new Ball(width, random(0,height), -3);
      balls.push(b);
      console.log(balls); //print the balls array to the console
    }

// //	draw all the balls in that array
	for (let i = 0; i < balls.length; i++) {
	 	      balls[i].drawBall();
       	  balls[i].moveBall();
        	balls[i].bounceBall();
	  }

}

//avatar class
class Avatar {

	constructor(x,y, speed, snake, face){ //every avatar needs an x value, a y value, and a speed
		    this.x = x;
    		this.y = y;
        this.speed = speed;
        this.snake = snake;
        this.face = face;
	}

	drawMe(){  // draw the running person
    		stroke("green");
        strokeWeight(3);
    		fill("blue");
        if (this.face == 1 && bouncing == true) {
        ellipse(this.x + this.snake,this.y,15,15);
      }

      if (this.face == 2 && bouncing == true) {
        ellipse(this.x - this.snake,this.y,15,15);
      }

      if (this.face == 3 && bouncing == true) {
        ellipse(this.x, this.y + this.snake,15,15);
      }

      if (this.face == 4 && bouncing == true) {
        ellipse(this.x, this.y - this.snake,15,15);
      }

	}

	moveMe(){
    if (keyIsDown(UP_ARROW)) { //if you hold the up arrow, move up by speed
       this.y -= this.speed;
       this.face = 4
    }

    if (keyIsDown(DOWN_ARROW)) { // if you hold the down arrow, move down by speed
        this.y += this.speed;
        this.face = 3
    }

    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
      this.face = 2
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
      this.face = 1
    }
	}

  die(){

  }

}


//ball class from which to create new balls with similar properties.
class Ball {

	//every ball needs an x value, a y value, and a speed
	constructor(x,y, speed){
		this.x = x;
    		this.y = y;
        	this.speed = speed;
	}

	// draw a ball on the screen at x,y
	drawBall(){
    		stroke(0);
        	strokeWeight(1);
    		fill("red");
		ellipse(this.x,this.y,10,10);
	}

	//update the location of the ball, so it moves across the screen
	moveBall(){
		this.x = this.x+ this.speed;
		this.y = this.y+.5;
	}

	//if the ball hits the paddle, change the speed value to negative (send it in the opposite direction)
  	bounceBall(){
    		if (this.x >= me.x-15 && this.x <= me.x+15 && this.y > me.y-15 && this.y < me.y+15){
      			this.speed = -this.speed;
            mySound.setVolume(0.05);
            mySound.play();
            this.snake += 15
            bouncing = true
    		}
  	}

}
