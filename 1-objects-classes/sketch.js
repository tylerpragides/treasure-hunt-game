//create a variable to hold one ball
// let b;
// let anotherPlanet;
// let planet3;

function setup() {
  createCanvas(800, 400);
  b = new Planet(0, 100,"red",20,2,2); //make a new ball from the Planet class and call it b.
  anotherPlanet = new Planet(200,20,"green",40,2,1);
  planet3 = new Planet(800,400,"blue",30,-1,-1.5);
  john = new Astronaut(400,400,20,0.25,-0.5)
}


function draw(){
	background(100);
    b.drawPlanet(); //draw the ball called b (go look in the Planet class for the drawPlanet function)
    b.movePlanet(); //move the ball called b (go look in the Planet class for the movePlanet function)
    anotherPlanet.drawPlanet();
    anotherPlanet.movePlanet();
    planet3.drawPlanet();
    planet3.movePlanet();
    john.drawAstronaut();
    john.moveAstronaut();

}


//ball class from which to create new balls with similar properties.
class Planet {

	constructor(x,y,color,radius,xspeed,yspeed){ //every ball needs an x value and a y value
		    this.x = x;
    		this.y = y;
        this.color= color;
        this.radius = radius;
        this.xspeed = xspeed;
        this.yspeed = yspeed;
	}
	drawPlanet(){  // draw a ball on the screen at x,y
    		stroke(0);
    		fill(this.color);
		    ellipse(this.x,this.y,this.radius,this.radius);
	}
	movePlanet(){ //update the location of the ball, so it moves across the screen
		this.x = this.x+this.xspeed;
		this.y = this.y+this.yspeed;
	}
}

class Astronaut {

	constructor(x,y,radius,xspeed,yspeed){ //every ball needs an x value and a y value
		    this.x = x;
    		this.y = y;
        this.radius = radius;
        this.xspeed = xspeed;
        this.yspeed = yspeed;
	}
	drawAstronaut(){  // draw a ball on the screen at x,y
    		stroke(0);
        noFill()
		    ellipse(this.x,this.y,this.radius,this.radius);
        fill(0,0,0)
        ellipse(this.x - 5,this.y - 2,this.radius - 18, this.radius - 18)
        fill(0,0,0)
        ellipse(this.x + 5,this.y - 2,this.radius - 18, this.radius - 18)
        noFill()
        arc(this.x,this.y-2,this.radius-5,this.radius-5,PI*2/10,PI*8/10)
        noFill()
        rect(this.x - 10,this.y + 10,this.radius,this.radius)
	}
	moveAstronaut(){ //update the location of the ball, so it moves across the screen
		this.x = this.x+this.xspeed;
		this.y = this.y+this.yspeed;
	}
}
