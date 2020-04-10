//P5.js :D

let bubble1;
let bubble2;

function setup() {
  createCanvas(1000, 800);
  bubble1 = new Bubble(200, 200, 40);
  bubble2 = new Bubble(400, 200, 20);
}

function draw() {
  background(255);
  fill(0);
  textSize(20);
  textFont("Georgia");
  text("Voici la partie java du mastermind, il sera réalisé dedans et on peut décorer la page autant qu'on veut avec\n du CSS faut juste prévoir un espace pour le mastermind",10,100);
  bubble1.move();
  bubble1.show();
  bubble2.move();
  bubble2.show();
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }

  show() {
    stroke(100);
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, this.r * 2);
  }
}
