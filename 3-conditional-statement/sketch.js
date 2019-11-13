//create an empty array called balls
let balls = [];

//create a variable to hold your avatar
let me;
// let dead = false;


function setup() {
  createCanvas(500, 400);

  //make one avatar called me
  me = new Avatar(width/2, 300, false);

}

function draw(){
  // if(dead){
	background(220);

  me.drawMe();
  me.moveMe();
  me.die();

  if (frameCount % 7 == 0) {
      let  b = new Ball(width, random(5,height), -7);
      balls.push(b);
      console.log(balls); //print the balls array to the console
    }

//	draw all the balls in that array
	for (let i = 0; i < balls.length; i++) {
	 	      balls[i].drawBall();
       	  balls[i].moveBall();
          // balls[i].die();

  }
}

//avatar class
class Avatar {

	constructor(x,y,died){ //every avatar needs an x value, a y value, and a speed
		    this.x = x;
    		this.y = y;
        this.died = died;
	}

	drawMe(){  // draw the running person
    if(this.died == false){
      stroke("green");
      strokeWeight(3);
      fill("blue");
      ellipse(this.x,this.y,20,20);
      line(this.x,this.y, this.x, this.y+40);
      line(this.x, this.y+40, this.x-20, this.y+60);
      line(this.x, this.y+40, this.x+10, this.y+50);
      line(this.x+10, this.y+50, this.x+5, this.y+60);
      line(this.x, this.y+15, this.x-10, this.y+25);
      line(this.x-10, this.y+25, this.x+10, this.y+35);
    }
    else if(this.died == true){
      text('game over',width/2,height/2)
    }


	}

	moveMe(){

       this.y = mouseY;


    // if (keyIsDown(DOWN_ARROW)) { // if you hold the down arrow, move down by speed
        this.x =mouseX;
    // }
	}

  die(){
    for (let i = 0; i < balls.length; i++) {
      if (balls[i].x >= this.x-15 && balls[i].x <= this.x+15 && balls[i].y > this.y-40 && balls[i].y < this.y+40){
        this.died = true;
      }

    }

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

	//if the ball hits the person, change the speed value to negative (send it in the opposite direction)

}
