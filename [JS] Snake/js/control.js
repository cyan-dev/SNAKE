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
*   => Correction de bugs mineurs
***************************************************************/
"use strict";

var keymap = {
    'q' : 0, 'ArrowLeft' : 0,
    'z' : 1, 'ArrowUp' : 1,
    'd' : 2, 'ArrowRight' : 2,
    's' : 3, 'ArrowDown' : 3
}

document.onkeydown = function(e) {
  /*
  * Gestion du menu pause
  */
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

  /*
  * Gestion du menu principal
  */
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

  /*
  * Gestion des déplacements
  */
  if(keymap[e.key] !== undefined && loop > 0) {
    snake.stockDir(keymap[e.key]);
  }

  /*
  * Gestion du changement de difficulté
  * dans le menu principal
  * 
  * dif ++
  */
  if(!menu.hidden && keymap[e.key] === 0) {
    if(newDifficulty + 1 < arrayDifficulty.length) {
      newDifficulty += 1;
      changeDisplayedDifficulty(arrayDifficulty[newDifficulty]);
    } else {
      newDifficulty = 0;
      changeDisplayedDifficulty(arrayDifficulty[newDifficulty]);
    }
  }

  /*
  * dif --
  */
  if(!menu.hidden && keymap[e.key] === 2) {
    if(newDifficulty - 1 > -1) {
      newDifficulty -= 1;
      changeDisplayedDifficulty(arrayDifficulty[newDifficulty]);
    } else {
      newDifficulty = arrayDifficulty.length - 1;
      changeDisplayedDifficulty(arrayDifficulty[newDifficulty]);
    }
  }
}