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
  * Snake.environement correspond à la grille dans laquelle le serpent existe.
  */
  this.environement = environement;

  /*
  * Snake.cell correspond à la cellule dans laquelle est la tête du serpent
  */
  this.cell = cell;

  /*
  * On précise à la cellule qu'elle contient le seprent
  */
  this.cell.setIsSnake(true);
  this.cell.setIsHead(true);

  /*
  * Snake.direction correspond à la direction du serpent.
  * Snake.direction peut être :
  *  0 : GAUCHE
  *  1 : HAUT
  *  2 : DROITE
  *  3 : BAS
  * de base, Snake.direction = 2 (DROITE)
  */
  this.direction = 2;

  /*
  * Snake.bufferDir est un tableau pouvant stocker jusqu'à 2 directions
  * C'est dans ce tableau que va piocher sa direction, 
  * Snake.changeDir(direction) à la case 0
  */
  this.bufferDir = [];

  /*
  * Snake.tailleQueue correspond à la taille de la queue du serpent
  */
  this.tailleQueue = 2;

  /*
  * Snake.queue est un tableau contenant les cellules 
  * correspondant à la queue du serpent
  */
  this.queue = [];


//------------------
// METHODES

  this.stockDir = function(direction) {
    /*
    * Snake.stockDir(direction : int) : null 
    * 
    * direction : int
    *   => bon bah c'est la direction quoi...
    *
    * return : undefined
    *   => aucun retour n'est spécifié
    *
    * Fonctionnement :
    * DEBUT
    *   Si la taille de Snake.bufferDir est inférieure à 2 :
    *     Snake.bufferDir prend direction en dernière valeur
    * FIN
    */
    if(this.bufferDir.length < 2) {
      this.bufferDir.push(direction);
    }
  }


  this.changeDir = function() {
    /*
    * Snake.changeDir(undefined) : undefined
    * 
    * param : undefined
    *   => aucun paramètre n'est spécifié
    *
    * return : undefined
    *   => aucun retour n'est spécifié
    *
    * fonctionnement :
    * DEBUT
    *   Si la taille de Snake.bufferDir est supérieure à 0 :
    *     Si la première direction de Snake.bufferDir n'est pas l'opposé
    *         de Snake.direction :
    *       Snake.direction prend la première valeur de Snake.bufferDir
    *       La première valeur de Snake.bufferDir est supprimé
    *     Sinon :
    *       La première valeur de Snake.bufferDir est supprimé
    * FIN
    */
    if(this.bufferDir.length > 0) {
      if(this.bufferDir[0] - this.direction !== 2 
          && this.bufferDir[0] - this.direction !== -2) {
        this.direction = this.bufferDir.shift();
      } else {
        this.bufferDir.shift();
      }
    }
  }


  this.move = function() {
    /*
    * Snake.move(undefined) : undefined
    * 
    * param : undefined
    *   => aucun paramètre n'est spécifié
    *
    * return : undefined
    *   => aucun retour n'est spécifié
    *
    * fonctionnement :
    * DEBUT
    *   Snake.cell n'est pas/plus une cellule du snake
    *   Snake.cell n'est pas/plus la tête du snake
    *   ajoute Snake.cell au tableau Snake.queue par le biais de 
    *       la methode Snake.addQueue(...)
    *
    *   Suivant Snake.direction :
    *     dans tous les Cas :
    *       Si le snake n'avance pas vers le bord de la grille :
    *         le snake avance d'une case dans la direction Snake.direction
    *       Sinon :
    *         le snake meurt, on lance une nouvelle partie avec
    *             la methode Snake.restart()
    *
    *   Si le snake repasse par une case qui lui appartient :
    *     le snake meurt, on lance une nouvelle partie avec
    *         la methode Snake.restart()
    *   Sinon :
    *     Snake.cell devient la tête du snake
    *
    *   actualisation de la grille
    * FIN
    */

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
    } // fin du switch

    if(this.cell.setIsSnake(true) === -1) {
      this.restart();
    } else {
      this.cell.setIsHead(true);
    }

    this.environement.forEach(function(cell) {
      cell.show(ctx, scl);
    });
  }


  this.addQueue = function(cell) {
    /*
    * Snake.addQueue(cell : Cell object) : undefined
    * 
    * cell : Cell object
    *   => cellule à ajouter à Snake.queue
    * 
    * return : undefined
    *   => aucun retour n'est spécifié
    *
    * Fonctionnement :
    * DEBUT
    *   Si la taille de Snake.queue est supérieure ou égale 
    *       à Snake.tailleQueue :
    *     la première valeur de Snake.queue n'est plus une cellule du snake
    *     la première valeur de Snake.queue est supprimé
    *
    *   Snake.queue prend cell en dernière valeur
    *   cell devient une cellule de snake
    * FIN
    */
    if(this.queue.length >= this.tailleQueue) {
      this.queue[0].setIsSnake(false);
      this.queue.shift();
    }

    this.queue.push(cell);
    cell.setIsSnake(true);
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