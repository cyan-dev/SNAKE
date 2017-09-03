"use strict";
/**************************************************
Function : index(i, j) 
Où i et j sont les coordonées d'une cellule.

Cette fonction permet de trouver la position dans le tableau grid
d'une cellule grace à ses coordonées i et j.
**************************************************/
function index(i, j, cols, rows) {
  if (i < 0 || i > cols-1 || j < 0 || j > rows-1) {
    return -1;
  } else {
    return i + j * cols;
  }
}