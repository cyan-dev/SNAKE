/***************************************************************
* Fichier : Food.js (object declaration)
* Projet  : [JS] Snake
* 
* Dev.    : Cyril ESCLASSAN & Dylan CARON
* Update  : 04/09/2017
*   => Mise à jour du commentary général
***************************************************************/
"use strict";

function Food(environement) {

//------------------
// ATTRIBUTS
  
  this.environement = environement;

  this.cell;


//------------------
// MÉTHODES
  
  this.generate = function() {
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