/***************************************************************
* Fichier : Snake.js (object declaration)
* Projet  : [JS] Snake
* 
* Dev.    : Cyril ESCLASSAN & Dylan CARON
* Update  : 04/09/2017
*   => Mise à jour du commentary général
***************************************************************/
"use strict";

function Snake(environement, cell) {

/* 
* Objet Snake
*
* Constructeur
* Snake(environement : array of Cell object, cell : Cell object) : Snake object
*
* Methodes
* Snake.stockDir(direction : int) : null
* Snake.changeDir(null) : null
* Snake.move(null) : null
* Snake.addQueue(cell : Cell object) : null
* Snake.restart(null) : null
*
* Attributs
* Snake.environement : array of Cell object
* Snake.cell : Cell object
* Snake.direction : int
* Snake.bufferDir : array of int
* Snake.tailleQueue : int
* Snake.queue : array of Cell object
*
* Using classes
* Cell.js => Cell object
*/

//------------------
// ATTRIBUTS

  /*  
  'environement' correspond à la grille dans laquelle le serpent existe.
  'environement' est passé en paramètre
  */
  this.environement = environement;

  /*
  'cell' correspond à la cellule dans laquelle est la tête du serpent
  'cell' est passé en paramètre
  */
  this.cell = cell;

  //On précise à la cellule qu'elle contient le seprent
  this.cell.setIsSnake(true);
  this.cell.setIsHead(true);

  /*
  'direction' correspond à la direction du serpent.
  'direction' peut être :
   0 : GAUCHE
   1 : HAUT
   2 : DROITE
   3 : BAS
  de base, 'direction' = 2 (DROITE)
  */
  this.direction = 2;

  /*
  'stockDir' est un tableau pouvant stocker jusqu'à 2 directions
  C'est dans ce tableau que va piocher sa direction, 'changeDir(direction)'
  à la case 0
  */
  this.bufferDir = [];

  /*
  'tailleQueue' correspond à la taille de la queue du serpent
  */
  this.tailleQueue = 2;

  /*
  'queue' est un tableau contenant les cellules 
  correspondant à la queue du serpent
  */
  this.queue = [];


//------------------
// METHODES

  /*
  'stockDir(direction)' permet de stocker la direction demandée.
  */
  this.stockDir = function(direction) {
    if(this.bufferDir.length < 2) {
      this.bufferDir.push(direction);
    }
  }

  /*
  'changeDir(direction)' permet de changer la direction du serpent
  */
  this.changeDir = function() {
    if(this.bufferDir.length > 0) {
      if(this.bufferDir[0] - this.direction !== 2 
          && this.bufferDir[0] - this.direction !== -2) {
        this.direction = this.bufferDir.shift();
      } else {
        this.bufferDir.shift();
      }
    }
  }

  /*
  'move()' permet de déplacer le serpent d'une case en fonction de direction
  */
  this.move = function() {
    this.cell.setIsSnake(false);
    this.cell.setIsHead(false);
    this.addQueue(this.cell);

    switch(this.direction) {
      case 0:
        if(this.cell.i != 0) {
          this.cell = this.environement[index(
            this.cell.i-1, 
            this.cell.j,
            cols,
            rows
          )];
            
        } else {
          this.restart();

        }
      break;

      case 1:
        if(this.cell.j != 0) {
          this.cell = this.environement[index(
            this.cell.i, 
            this.cell.j-1,
            cols,
            rows
          )];

        } else {
          this.restart();

        }
      break;

      case 2:
        if(this.cell.i != cols-1) {
          this.cell = this.environement[index(
            this.cell.i+1, 
            this.cell.j,
            cols,
            rows
          )];

        } else {
          this.restart();

        }
      break;

      case 3:
        if(this.cell.j != rows-1) {
          this.cell = this.environement[index(
            this.cell.i, 
            this.cell.j+1,
            cols,
            rows
          )];

        } else {
          this.restart();

        }
      break;
    }

    if(this.cell.setIsSnake(true) === -1) {
      this.restart();
    } else {
      this.cell.setIsHead(true);
    }
    //Actualisation de la grille
    this.environement.forEach(function(cell) {
      cell.show(ctx, scl);
    });
  }

  this.addQueue = function(cell) {
    if(this.queue.length >= this.tailleQueue) {
      this.queue[0].setIsSnake(false);
      this.queue.shift();
    } 
    this.queue.push(cell);

    if(cell.setIsSnake(true) === -1) {
      this.restart();
    }
  }

  this.restart = function() {
    mainTheme.pause();
    mainTheme.load();
    dieSound.play();
    
    this.cell.setIsSnake(false);
    this.cell.setIsHead(false);
    this.cell = this.environement[index(
      /* i */Math.floor((cols-1)/2),
      /* j */Math.floor((rows-1)/2),
      cols,
      rows
    )];

    this.queue.forEach(function(queueCell) {
      queueCell.setIsSnake(false);
    });
    
    if(this.tailleQueue+1 > 10) {
      score *= (this.tailleQueue+1)/10;
    }
    if(score > affichageBest.textContent) {
        affichageBest.textContent = Math.floor(score);
    }
    affichageLast.textContent = Math.floor(score);
    affichageScore.textContent = 0 + ' x' + 0;
      
    this.queue = [];
    this.bufferDir = [];
    this.direction = 2;
    this.tailleQueue = 2;
    score = 0;
    food.generate();

    setTimeout(function() {
      if(pause.hidden && menu.hidden) {
        mainTheme.play();
      }  
    }, 500);

  }
}