/***************************************************************
* Fichier : control.js (script JS)
* Projet  : [JS] Snake
* 
* arborescence :
* js
* |- game.js
* |- control.js *
* |- class
* |  |- Cell.js
* |  |- Food.js
* |  |- Snake.js
* |- tools
* |  |- 2dArray.js
* 
* Dev.    : Cyril ESCLASSAN & Dylan CARON
* Update  : 09/09/2017
*   => Correction de bugs mineurs + commentary
***************************************************************/
"use strict";

/*
* keymap fait le lien entre les touches ZQSD/touches fléchées
* et la direction correspondante
*/
var keymap = {
    'q' : 0, 'Q' : 0, 'ArrowLeft' : 0,
    'z' : 1, 'Z' : 1, 'ArrowUp' : 1,
    'd' : 2, 'D' : 2, 'ArrowRight' : 2,
    's' : 3, 'S' : 3, 'ArrowDown' : 3
}

document.onkeydown = function(e) {
  /*
  * Gestion du menu pause
  *
  * Fonctionnement :
  * DEBUT
  *   Si la touche pressé est la touche "espace" :
  *     Si aucun menu n'est affiché :
  *       mise en pause du jeu
  *       mise en pause de la musique
  *       affichage du menu pause
  *       affichage du calque sombre derrière le menu
  *     Sinon :
  *       reprise de la musique
  *       masquage du menu principal
  *       masquage du menu pause
  *       masquage du calque sombre derrière le menu
  *       reprise du jeu
  * FIN
  */
  if(e.key === ' ') {
    if(pause.hidden && menu.hidden) {
      clearInterval(loop);
      loop = 0;
      mainTheme.pause();
      pause.hidden = false;
      shadow.hidden = false;
    } else {
      mainTheme.play();
      menu.hidden = true;
      pause.hidden = true;
      shadow.hidden = true;
      loop = main(loop);
    }
  }

  /*
  * Gestion du menu principal
  *
  * Fonctionnement :
  * DEBUT
  *   Si la touche pressé est la touche "entrée" :
  *     Si le menu principal n'est pas affiché :
  *       mise en pause du jeu
  *       mise en pause de la musique
  *       affichage du menu principal
  *       masquage du menu pause
  *       affichage du calque sombre derrière le menu
  *     Sinon :
  *       masquage du menu principal
  *       masquage du calque sombre derrière le menu
  *       la difficulté actuelle prend la valeur de la nouvelle difficulté
  *       reprise du jeu
  *       remise à zéro de la partie
  * FIN
  */
  if(e.key === 'Enter') {
    if(menu.hidden) {
      clearInterval(loop);
      loop = 0;
      mainTheme.pause();
      menu.hidden = false;
      pause.hidden = true;
      shadow.hidden = false;
    } else {
      menu.hidden = true;
      shadow.hidden = true;
      currentDifficulty = newDifficulty;
      loop = main(loop);
      snake.restart();
    }
  }

  /*
  * Gestion des déplacements
  *
  * Fonctionnement
  * DEBUT
  *   Si la touche pressé est une des touches du keymap :
  *     On stoque la direction correspondant à la touche pressé
  * FIN
  */
  if(keymap[e.key] !== undefined && loop > 0) {
    snake.stockDir(keymap[e.key]);
  }

  /*
  * Gestion du changement de difficulté
  * dans le menu principal
  * 
  * difficulté ++
  *
  * Fonctionnement :
  * DEBUT
  *   Si le menu principal est affiché 
  *       ET que la direction corespondant à la touche pressé 
  *       selon le keymap est 2 (droite) :
  *     Si la nouvelle difficulté + 1 
  *         ne dépasse pas la taille du tableau de difficulté :
  *       la nouvelle difficulté prend sa valeur + 1
  *       remplacement de la difficulté affiché en surbrillance
  *           par la nouvelle difficulté
  *     Sinon :
  *       la nouvelle difficulté prend la valeur 0 (easy)
  *     remplacement de la difficulté affiché en surbrillance
  *           par la nouvelle difficulté
  * FIN
  */
  if(!menu.hidden && keymap[e.key] === 2) {
    if(newDifficulty + 1 < arrayDifficulty.length) {
      newDifficulty += 1;
      changeDisplayedDifficulty(arrayDifficulty[newDifficulty]);
    } else {
      newDifficulty = 0;
      changeDisplayedDifficulty(arrayDifficulty[newDifficulty]);
    }
  }

  /*
  * difficulté --
  *
  * Fonctionnement :
  * DEBUT
  *   Si le menu principal est affiché 
  *       ET que la direction corespondant à la touche pressé 
  *       selon le keymap est 0 (gauche) :
  *     Si la nouvelle difficulté - 1 est strictement supérieure à -1 :
  *       la nouvelle difficulté prend sa valeur - 1
  *       remplacement de la difficulté affiché en surbrillance
  *           par la nouvelle difficulté
  *     Sinon :
  *       la nouvelle difficulté prend la dernière valeur 
  *           du tableau de difficulté (hard)
  *       remplacement de la difficulté affiché en surbrillance
  *           par la nouvelle difficulté
  * FIN
  */
  if(!menu.hidden && keymap[e.key] === 0) {
    if(newDifficulty - 1 > -1) {
      newDifficulty -= 1;
      changeDisplayedDifficulty(arrayDifficulty[newDifficulty]);
    } else {
      newDifficulty = arrayDifficulty.length - 1;
      changeDisplayedDifficulty(arrayDifficulty[newDifficulty]);
    }
  }
}