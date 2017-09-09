/***************************************************************
* Fichier : Cell.js (object declaration)
* Projet  : [JS] Snake
*
* arborescence :
* js
* |- game.js
* |- control.js
* |- class
* |  |- Cell.js *
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

function Cell(i, j) {
  /* 
  * Objet Cell
  *
  * CONSTRUCTEUR
  * Cell(i : int, j : int) : Cell Object
  *  
  * ATTRIBUTS
  * Cell.i : int
  * Cell.j : int
  * Cell.isSnake : bool
  * Cell.isFood : bool
  * Cell.isHead : bool
  *
  * MÉTHODES
  * Cell.show(ctx : object, scl : int) : int
  * Cell.setIsSnake(isSnake : bool)
  * Cell.setIsHead(isHead : bool)
  * Cell.setIsFood(isFood : bool)
  */

//==============================
//========  ATTRIBUTS  =========
//==============================

  /*
  * Cell.i correspond aux coordonées i (horizontale) (unitée : case)
  */
  this.i = i;

  /*
  * Cell.j correspond aux coordonées j (verticale) (unitée : case)
  */
  this.j = j;

  /*
  * Cell.isSnake est l'état booléen
  * indiquant si la cellule est une cellule du snake
  */
  this.isSnake = false;

  /*
  * Cell.isFood est l'état booléen
  * indiquant si la cellule est une food
  */
  this.isFood = false;

  /*
  * Cell.isHead est l'état booléen
  * indiquant si la cellule est la tête du snake
  */
  this.isHead = false;


//==============================
//=========  METHODES  =========
//==============================

  this.show = function(ctx, scl) {  
    /*
    * Cell.show(ctx : obj, scl : int) : undefined
    * 
    * ctx : obj
    *   => ctx est le contexte du canvas que l'on utilisera pour dessiner
    * 
    * scl : int
    *   => scl est la taille d'une case de la grille
    *
    * return : undefined
    *   => aucun retour n'est spécifié
    *
    * Fonctionement :
    * DEBUT
    *   x prend la valeur i * scl (coordonées de i en pixel)
    *   y prend la valeur j * scl (coordonées de j en pixel)
    *
    *   définition de la couleur du contour en blanc
    *   application du contour à la cellule de coordonées situé à (x, y)
    *       de taille scl * scl
    *
    *   Si la cellule est celle ou est le serpent:
    *     définition de la couleur de remplissage à "cyan"
    *   Sinon, si la cellule est celle ou se trouve la nouriture:
    *     définition de la couleur de remplissage à "deeppink"
    *   Sinon:
    *     définition de la couleur de remplissage à "rgb(25,25,50)"
    *
    *   application du remplissage de la cellule situé à (x, y)
    *       de taille scl * scl
    *
    *   Si la cellule est la tête du serpent:
    *     définition d'un cercle au millieu de la cellule situé à (x, y)
    *         de rayon 10
    *     définition de la couleur de remplissage à "deeppink"
    *     application du cercle rempli
    * FIN
    */

    let x = i*scl;
    let y = j*scl;

    ctx.strokeStyle = 'cyan';
    ctx.strokeRect(x, y, scl, scl);

    if(this.isSnake) {            
      ctx.fillStyle = 'cyan';     
    } else if(this.isFood) {    
      ctx.fillStyle = 'deeppink'; 
    } else {                      
      ctx.fillStyle = 'rgb(25,25,50)';  
    }

    
    ctx.fillRect(x, y, scl, scl);

    if(this.isHead) {
      ctx.beginPath();
      ctx.arc(x+(scl/2), y+(scl/2), 10, 0, 2*Math.PI, false);
      ctx.fillStyle = 'deeppink';
      ctx.fill();
      ctx.closePath();
    }
  }


  this.setIsSnake = function(isSnake) {
    /*
    * Cell.setIsSnake(isSnake : bool) : int
    *
    * isSnake : bool
    *   => isSnake indique si la case fait parti du serpent ou non
    *
    * return : int
    *   => retourne -1 si la cellule que l'on veux donner au serpent
    *   fait déjà parti du serpent
    *
    * Fonctionement :
    * DEBUT
    *   Si la cellule fait déjà parti du serpent :
    *     on retourne simplement -1
    *   Sinon :
    *     Cell.isSnake prend la valeur de isSnake
    * FIN
    */

    if(this.isSnake && isSnake) {
      return -1;
    } else {
      this.isSnake = isSnake;
    }
  }


  this.setIsHead = function(isHead) {
    /*
    * Cell.setIsHead(isHead : bool) : undefined
    * 
    * isHead : bool
    *   => isHead indique si la cellule est la tête du serpent ou non
    *
    * return : undefined
    *   => aucun retour n'est spécifié
    *
    * Fonctionement :
    * DEBUT
    *   Cell.isHead prend la valeur de isHead
    * FIN
    */
    this.isHead = isHead;
  }


  this.setIsFood = function(isFood) {
    /*
    * Cell.setIsFood(isFood : bool) : undefined
    * 
    * isHead : bool
    *   => isFood indique si la cellule est de la nourriture ou non
    *
    * return : undefined
    *   => aucun retour n'est spécifié
    *
    * Fonctionement :
    * DEBUT
    *   Cell.isFood prend la valeur de isFood
    * FIN
    */
    this.isFood = isFood;
  }
}