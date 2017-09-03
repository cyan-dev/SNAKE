"use strict";

function Food(environement) {
/***********
ATTRIBUTS
***********/
  
  /*  
  'environement' correspond à la grille dans laquelle le serpent existe
  'environement' est passé en paramètre
  */
  this.environement = environement;

  /*

  */
  this.cell;


/***********
METHODES
***********/
  /*

  */
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