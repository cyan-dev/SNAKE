/***************************************************************
* Fichier : Food.js (object declaration)
* Projet  : [JS] Snake
* 
* Dev.    : Cyril ESCLASSAN & Dylan CARON
* Update  : 04/09/2017
*   => Mise à jour du commentary général
***************************************************************/
"use strict";

/* 
* Objet Food
*
* CONSTRUCTEUR
* Food(environement : array of Cell object) : Food Object
*  
* ATTRIBUTS
* Food.environement : array of Cell object
* Food.cell : Cell object
*
* MÉTHODES
* Food.generate(environement : array of Cell object) : undefined
*/

function Food(environement) {

//------------------
// ATTRIBUTS
  
  /*
  * Food.environement correspond à la grille dans laquelle la food existe.
  */
  this.environement = environement;

  /*
  * Food.cell correspond à la cellule qui apartient à Food
  */
  this.cell;


//------------------
// METHODES
  
  this.generate = function() {
    /*
    * Food.generate(undefined) : undefined
    *
    * param : undefined
    *   => aucun paramètre n'est spécifié
    *
    * return : undefined
    *   => aucun retour n'est spécifié
    *
    * Fonctionement:
    * DEBUT
    *   Si Food.cell existe déjà :
    *     on indique que la cell.isFood n'est plus une cellule food
    *
    *   Tant que Food.cell est une cellule snake OU 
    *       que Food.cell est une cellule food :
    *     Food.cell prend la valeur d'une cellule pioché aléatoirement
    *         dans Food.environement
    *
    *   Food.cell devient une cellule food
    * FIN
    */
    if(this.cell !== undefined) {
      this.cell.setIsFood(false);
    }

    do {
      this.cell = this.environement[
          Math.floor(Math.random() * this.environement.length)];
    } while(this.cell.isSnake === true || this.cell.isFood === true);
      
    this.cell.setIsFood(true);
  }
}