function selectedColor(x) { //prend en paramètre r,g,b,p,y,br,bl,w
  if (x == "r") { //rouge
    fill(255, 0, 0);
  } else if (x == "b") {
    fill(0, 0, 255);
  } //bleu
  else if (x == "b") {
    fill(0, 255, 0);
  } //vert
  else if (x == "b") {
    fill(214, 245, 17);
  } //jaune
  else if (x == "b") {
    fill(164, 25, 143);
  } //violet
  else if (x == "b") {
    fill(100, 66, 34);
  } //marron
  else if (x == "b") {
    fill(0);
  } //noir
  else if (x == "b") {
    fill(255);
  } //blanc
}

function isInside(x, y, objX, objY, objWidth) { //vérifie si l'on est dans un carré
  if (x > objX && x < objX + objWidth) {
    if (y > objY && y < objY + objWidth) {
      return true;
    } else {
      return false;
    }

  } else {
    return false;
  }
}

function isInsideRec(x, y, objX, objY, objWidth, objHeight) { //vérifie si l'on est //dans un rectangle
  if (x > objX && x < objX + objWidth) {
    if (y > objY && y < objY + objHeight) {
      return true;
    } else {
      return false;
    }

  } else {
    return false;
  }
}

//les cases du mastermind, on peut cliquer dessus pour mettre la couleur choisie
//attention on ne peut changer qu'une ligne à la fois
class caseMaster {
  constructor(x, y, side) {
    this.x = x;
    this.y = y;
    this.s = side;
    this.col =0;
    
  }
  show () {
    fill(150,0,200,this.col);
    rect(this.x, this.y, this.s, this.s);
  }
}

//cases de résultat, on ne peut pas y toucher et elles affichent si on a de bonnes
//réponses
class caseResult {
  constructor(x, y, side) {
    this.x = x;
    this.y = y;
    this.s = side;
  }
  show () {
    rect(this.x, this.y, this.s, this.s);
  }
}

//cases de couleur sur lesquelles on clique
class caseChoice {
  constructor(x, y, side, col) {
    this.x = x;
    this.y = y;
    this.s = side;
    selectedColor(col);
    rect(this.x, this.y, this.s, this.s);
  }
}

class Button {
  constructor(x, y, w, h, r, g, b, sent) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r;
    this.g = g;
    this.b = b;
    this.sent = sent;
  }
  show() {
    stroke(255);
    strokeWeight(2);
    fill(this.r, this.g, this.b);
    rect(this.x, this.y, this.w, this.h);
    noStroke();
    fill(255);
    textSize(15);
    text(this.sent, this.x+10, this.y+20);
  }
}