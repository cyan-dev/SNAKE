/***************************************************************
* Fichier : game.js (script JS)
* Projet  : [JS] Snake
* 
* arborescence :
* js
* |- game.js *
* |- control.js
* |- class
* |  |- Cell.js
* |  |- Food.js
* |  |- Snake.js
* |- tools
* |  |- 2dArray.js
* 
* Dev.    : Cyril ESCLASSAN & Dylan CARON
* Update  : 09/09/2017
*   => décalage de la gestion des controles vers control.js
***************************************************************/
"use strict";

//==============================
//====  VARIABLES GLOBALES  ====
//==============================

//------------------
// MENUS

/*
* Elt div Menu Pause
*/
var pause = document.getElementById('pause');
pause.hidden = true;    //Etat par defaut : caché

/*
* Elt div Menu principal
*/
var menu = document.getElementById('menu');
menu.hidden = false;   //Etat par defaut : caché

/*
* Element de gestion de l'ombre lors de l'ouverture des menus
*/
var shadow = document.getElementById('shadow');



//dir dans laquelle se trouve la grille de jeu
var game = document.getElementById('game');

//variable de stockage de l'etat de la boucle dans laquelle tourne le jeu
var loop;

//var de gestion de difficultée 0 : easy, 1 : medium, 2 : hard
var currentDifficulty = 1; //Etat par defaut : 1 [MEDIUM]
var newDifficulty = 1;
var btnDifficulty = document.querySelectorAll('.indifficulty');
var arrayDifficulty = [
  'easy',
  'medium',
  'hard'
];

//spans de dificultées du gestionaire de difficultée dans le menu
var easyDiff = document.getElementById('easy');       //easy
var mediumDiff = document.getElementById('medium');   //medium
var hardDiff = document.getElementById('hard');       //hard

//tableau des vitesse
//1 actualisation toutes les 160/100/70 millisecondes
//en fonction de la difficultée (var difficulty)
var vitesse = [160, 100, 70];

//------------------
// AUDIO

//musique du jeu
var btnMusic = document.getElementById('music');
var mainTheme = document.getElementById('mainTheme');
mainTheme.volume = 0.25;  //volume à 25% de base

//son nourriture
var btnSound = document.getElementById('sound');
var eatSound = document.getElementById('eatSound');
eatSound.volume = 0.1;    //volume à 10% de base

//son de mort
var dieSound = document.getElementById('dieSound');
dieSound.volume = 0.1;    //volume à 10% de base

//------------------
// INTERFACE DE SCORE

//p d'affichage du score en cours
var affichageScore = document.getElementById('scoreNumber');
affichageScore.textContent = 0 + ' x' + 0;  //de base on affiche "0 x0"

//p d'affichage du score de la dernière partie jouée
var affichageLast = document.getElementById('lastNumber');
affichageLast.textContent = 0;  //de base on affiche "0"

//p d'affichage du meilleur score de la session en cours
var affichageBest = document.getElementById('bestNumber');
affichageBest.textContent = 0;  //de base, on affiche "0"

//var de stockage temporaire des cellules de la grille
var cell;

//tableau de stockage des cellules constituant la grille
var grid = [];

//respectivement, vars de stockage du nombre de colones et de lignes
var cols, rows;

//taille en longueur et largeur d'une cellule
var scl = 40; //de base : 40px

//var de stockage du score de la partie en cours
var score = 0;

//==============================
//====  CORP DU JAVASCRIPT  ====
//==============================

//Création du canvas
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 800;   //largeur
canvas.height = 600;  //hauteur
canvas.style.border = '2px solid deeppink';
canvas.style.backgroundColor = 'grey';
game.appendChild(canvas);

//Nb de colones
cols = Math.floor(canvas.width/scl);
//Nb de lignes
rows = Math.floor(canvas.height/scl);

//Création des cellules et ajout de celles-ci 
//dans le tableau qui représente la grille
for(let i = 0; i < rows; i ++) {    //Pour chaques colones
  for(let j = 0; j < cols; j++) {   //de chaque lignes...
    cell = new Cell(j, i);
    grid.push(cell);
  }
}

//Affichage de chaque cellules de la grille
grid.forEach(function(cell) {
  cell.show(ctx, scl);
});

//Création du serpent dans la case centrale de la grille
var snake = new Snake(grid, 
  grid[index(
    /* i */Math.floor((cols-1)/2),
    /* j */Math.floor((rows-1)/2),
    cols,
    rows
  )]
);

var food = new Food(grid);
food.generate();

btnDifficulty.forEach(function(elt) {
  elt.onclick = function() {
    newDifficulty = arrayDifficulty.indexOf(this.id);
    changeDisplayedDifficulty(this.id);
  }
});

var changeDisplayedDifficulty = function(diff) {
  btnDifficulty.forEach(function(elt) {
    if(elt.id === diff) {
      elt.classList.remove("notActivated");
      elt.classList.add("activated");
    } else {
      elt.classList.remove("activated");
      elt.classList.add("notActivated");
    }
  });
};

btnMusic.onclick = function() {
  if(mainTheme.volume > 0) {
    mainTheme.volume = 0;
    this.classList.remove("activated");
    this.classList.add("notActivated");
  } else {
    mainTheme.volume = 0.25;
    this.classList.remove("notActivated");
    this.classList.add("activated");
  }
}

btnSound.onclick = function() {
  if(eatSound.volume > 0) {
    eatSound.volume = 0;
    dieSound.volume = 0;
    this.classList.remove("activated");
    this.classList.add("notActivated");
  } else {
    eatSound.volume = 0.1;
    dieSound.volume = 0.1;
    this.classList.remove("notActivated");
    this.classList.add("activated");
  }
}

var main = function(loop) {
  loop = setInterval(function() {
    snake.move();
    if(score > 0) {
      score -= 1;
      affichageScore.textContent = score;
      if(snake.tailleQueue+1 > 10) {
        affichageScore.textContent += ' x' + snake.tailleQueue/10;
      } else {
        affichageScore.textContent += ' x' + 1;
      }
    }
    snake.changeDir();
    if(snake.cell.isFood) {
      score += 50;
      affichageScore.textContent = score;
      if(snake.tailleQueue+1 > 10) {
        affichageScore.textContent += ' x' + snake.tailleQueue/10;
      } else {
        affichageScore.textContent += ' x' + 1;
      }
      eatSound.play();
      food.generate();
      snake.tailleQueue += 1;
    }
  }, vitesse[currentDifficulty]);
  return loop;
}