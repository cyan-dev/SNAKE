/***************************************************************
* Fichier : game.js (main JS)
* Projet  : [JS] Snake
*
* arborescence :
* js
* |- game.js *
* |- class
* |  |- Cell.js
* |  |- Food.js
* |  |- Snake.js
* |- tools
* |  |- 2dArray.js
* 
* Dev.    : Cyril ESCLASSAN & Dylan CARON
* Update  : 04/09/2017
*   => Mise à jour du commentary général
***************************************************************/
"use strict";

//==============================
//====  VARIABLES GLOBALES  ====
//==============================

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

//spans de fiddicultées du gestionaire de difficultée dans le menu
var easyDiff = document.getElementById('easy');       //easy
var mediumDiff = document.getElementById('medium');   //medium
var hardDiff = document.getElementById('hard');       //hard

//tableau des vitesse
//1 actualisation toutes les 160/100/70 millisecondes
//en fonction de la difficultée (var difficulty)
var vitesse = [160, 100, 70];

//------------------
// MENUS


//div dans laquelle se trouve le menu pause
var pause = document.getElementById('pause');
pause.hidden = true;  //Etat par defaut : caché

//div dans laquelle se trouve le menu principal
var menu = document.getElementById('menu');
menu.hidden = false;   //Etat par defaut : caché

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

//tableau de comparaison pour les évenements "key down" 
//sur les fleches directionelles
var arrow = [
    'ArrowLeft',
    'ArrowUp',
    'ArrowRight',
    'ArrowDown'
  ] 

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

//On surveille un évenement "key down" (appuie sur une touche)
document.onkeydown = function(e) {


  if(arrow.indexOf(e.key) > -1) {
    if(loop > 0) {
      snake.stockDir(arrow.indexOf(e.key));
    } else if(!menu.hidden && e.key === 'ArrowRight') {
      if(newDifficulty + 1 < arrayDifficulty.length) {
        newDifficulty += 1;
        changeDisplayedDifficulty(arrayDifficulty[newDifficulty]);
      } else {
        newDifficulty = 0;
        changeDisplayedDifficulty(arrayDifficulty[newDifficulty]);
      }
    } else if(!menu.hidden && e.key === 'ArrowLeft') {
      if(newDifficulty - 1 > -1) {
        newDifficulty -= 1;
        changeDisplayedDifficulty(arrayDifficulty[newDifficulty]);
      } else {
        newDifficulty = arrayDifficulty.length - 1;
        changeDisplayedDifficulty(arrayDifficulty[newDifficulty]);
      }
    }
  }

  if(e.key === ' ') {
    if(pause.hidden && menu.hidden) {
      clearInterval(loop);
      mainTheme.pause();
      shadow.hidden = false;
      pause.hidden = false;

      loop = 0;
    } else {
      mainTheme.play();
      menu.hidden = true;
      shadow.hidden = true;
      pause.hidden = true;
      loop = main(loop);
    }
  }

  if(e.key === 'Enter') {
    if(menu.hidden) {
      clearInterval(loop);
      mainTheme.pause();
      menu.hidden = false;
      shadow.hidden = false;
      pause.hidden = true;
      loop = 0;
    } else {
      shadow.hidden = true;
      menu.hidden = true;
      currentDifficulty = newDifficulty;
      loop = main(loop);
      snake.restart();
    }
  }
}

btnDifficulty.forEach(function(elt) {
  elt.onclick = function() {
    newDifficulty = arrayDifficulty.indexOf(this.id);
    changeDisplayedDifficulty(this.id)
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