/***************************************************************
* Fichier : Cell.js (object declaration)
* Projet  : [JS] Snake
* 
* Dev.    : Cyril ESCLASSAN & Dylan CARON
* Update  : 03/09/2017
*   => Mise à jour du commentary général
***************************************************************/
"use strict";

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

function Cell(i, j) {

//------------------
// ATTRIBUTS

  this.i = i;

  this.j = j;

  this.isSnake = false;

  this.isFood = false;

  this.isHead = false;


//------------------
// MÉTHODES

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
    *   Si la celulle est celle ou est le serpent:
    *     définition de la couleur de remplissage à "cyan"
    *   Sinon, si la celulle est celle ou se trouve la nouriture:
    *     définition de la couleur de remplissage à "deeppink"
    *   Sinon:
    *     définition de la couleur de remplissage à "rgb(25,25,50)"
    *
    *   application du remplissage de la celulle situé à (x, y)
    *       de taille scl * scl
    *
    *   Si la celulle est la tête du serpent:
    *     définition d'un cercle au millieu de la celulle situé à (x, y)
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


  /*
  * Cell.setIsSnake(isSnake : bool) : int
  *
  * isSnake : bool
  *   => isSnake indique si la case fait parti du serpent ou non
  *
  * return : int
  *   => retourne -1 si la celulle que l'on veux donner au serpent
  *   fait déjà parti du serpent
  *
  * Fonctionement :
  * DEBUT
  *   Si la celulle fait déjà parti du serpent :
  *     on retourne simplement -1
  *   Sinon :
  *     Cell.isSnake prend la valeur de isSnake
  * FIN
  */
  this.setIsSnake = function(isSnake) {
    if(this.isSnake && isSnake) {
      return -1;
    } else {
      this.isSnake = isSnake;
    }
  }

  
  /*
  * Cell.setIsHead(isHead : bool) : undefined
  * 
  * isHead : bool
  *   => isHead indique si la celulle est la tête du serpent ou non
  *
  * return : undefined
  *   => aucun retour n'est spécifié
  *
  * Fonctionement :
  * DEBUT
  *   Cell.isHead prend la valeur de isHead
  * FIN
  */
  this.setIsHead = function(isHead) {
    this.isHead = isHead;
    
  }


  /*
  * Cell.setIsFood(isFood : bool) : undefined
  * 
  * isHead : bool
  *   => isFood indique si la celulle est de la nourriture ou non
  *
  * return : undefined
  *   => aucun retour n'est spécifié
  *
  * Fonctionement :
  * DEBUT
  *   Cell.isFood prend la valeur de isFood
  * FIN
  */
  this.setIsFood = function(isFood) {
    this.isFood = isFood;
  }
}