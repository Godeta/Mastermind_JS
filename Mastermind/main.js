let casesMaster = []; //tableau pour les cases du mastermind
let casesResult = []; //les cases des résultats
let casesChoice = []; //les cases avec choix des couleurs

butadd = new Button(600, 300, 100, 40, 54, 180, 220, "Ajouter case");
butdel = new Button(750, 300, 100, 40, 54, 180, 220, "Retirer case");

let mode = "facile"; //mode de difficulté
let nbCases = 4;
let nbCol = 12;

function setup() {
  createCanvas(1000, 700);


  for (let j = 1; j <= 12; j++) { //12 colonnes
    for (let i = 0; i < 4; i++) { //4 lignes
      let c = new caseMaster(i * 50 + 100, j * 50, 50);
      casesMaster.push(c);

    }

    for (let i = 1; i <= 4; i++) { //4 cases
      let f = new caseChoice(400 + i * 50, 600, 50, i);
      casesChoice.push(f);
    }

  }
}

function draw() {
  background(200);

  butadd.show();
  butdel.show();
  noStroke();
  fill(255);
  textSize(35);
  text("Changer la difficulté :", 550, 200);


  hover();
  showTabs();

}

function mousePressed() {
  if (isInsideRec(mouseX, mouseY, butadd.x, butadd.y, butadd.w, butadd.h) == true) { //si on clique sur ajouter case
    /*  let x = casesMaster[casesMaster.length-1].x+50;
        for (let j = 1; j <= 12; j++) { //12 colonnes
     let c = new caseMaster(x,j*50+50,50);
      casesMaster.push(c);
          
     }*/
    nbCases++;
    updateTab();
  } else if (isInsideRec(mouseX, mouseY, 750, 300, 100, 40) == true) { //si on clique sur retirer case
    if (casesMaster.length > 36) {
      /*  for (let j = 1; j <= 12; j++) { //12 colonnes
              casesMaster.splice(casesMaster.length-1, 1);
       casesResult.splice(casesResult.length-1,1);
              }*/

      nbCases--;
      updateTab();
    }
  }
}

function hover() { //si la souris est sur un élement
  if (isInsideRec(mouseX, mouseY, butadd.x, butadd.y, butadd.w, butadd.h) == true) { //ajouter case
    butadd.g = 0;
  } else {
    butadd.g = 180;
  }
  //retirer case
  if (isInsideRec(mouseX, mouseY, 750, 300, 100, 40) == true) {
    butdel.r = 200;
    if (casesMaster.length <= 36) {
      textSize(20);
      text("Nombre de cases déjà au minimum !!!", 500, 400);
    }
  } else {
    butdel.r = 54;
  }

  //sur une case de la dernière ligne du mastermind
  for (let i = 1; i <= nbCases; i++) {
    /*if (isInside(mouseX,mouseY,50+i*50,casesMaster[casesMaster.length-i].y,50 )==true ) */
    if (isInside(mouseX, mouseY, casesMaster[casesMaster.length - i].x, casesMaster[casesMaster.length - i].y, 50) == true) {
      casesMaster[casesMaster.length - i].col = 255;
      //console.log(i);
    } else {
      casesMaster[casesMaster.length - i].col = 0;
    }
  }
  for (let i = 1; i <= 4; i++) { //4 cases
    if (isInside(mouseX, mouseY, casesChoice[i].x, casesChoice[i].y, 50) == true) {
      casesChoice[i].s = 70;
    } else {
      casesChoice[i].s = 50;
    }
  }
}

function showTabs() {
  for (let i = 0; i < casesMaster.length; i++) {
    /*if (casesMaster[i].contains(mouseX, mouseY)) {
      bubbles[i].changeColor(255);
    } else {
      bubbles[i].changeColor(0);
    }*/
    noFill();
    stroke(0);
    casesMaster[i].show();
  }
  for (let j = 1; j <= 12; j++) { //12 colonnes texte
    textSize(20);
    text(j, casesMaster[casesMaster.length - 1].x + 60, j * 50 + 30);
  }

  //cases couleurs
  for (let i = 0; i < casesChoice.length; i++) {
    noFill();
    stroke(0);
    casesChoice[i].show();
  }
}

function updateTab() {
  casesMaster = [];
  for (let j = 1; j <= 12; j++) { //12 colonnes
    for (let i = 0; i < nbCases; i++) { //4 lignes
      let c = new caseMaster(i * 50 + 100, j * 50, 50);
      casesMaster.push(c);

    }
  }
}