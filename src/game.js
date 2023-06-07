import Ship from "./models/ship.js";
import Enemy from "./models/enemy.js";
import GameArea from "./models/gameArea.js";
import Asteroid from "./models/astroids.js";
import Wall from "./models/wall.js";
import GameEvent from "./models/gameEvent.js";
import GameScene from "./scene/game-scene.js";
import MenuScene from "./scene/menu-scene.js";
import EndGameScene from "./scene/end-game-scene.js";

const BLOCK_WIDTH = 50;
const BLOCK_HEIGHT = 50;

const CAMERA = document.getElementById("camera");
var gameScene = new GameScene(CAMERA);
gameScene.build();
gameScene.draw();

var menuScene = new MenuScene(CAMERA);
// menuScene.build();

var endGameScene = new EndGameScene(CAMERA);
// endGameScene.build();

//var spaceshipSpeed = 10;
//var enemySpeed = 5;
//
//// Maximale Anzahl der Gegner pro Level
//
//// Zähler für die erzeugten Gegner
//
//var eventInterval;
//
//
//var score = 30;
//
//var keys = {};
//
//var enemySpeed = 3;
//
function handleKeyDown(event) {
  gameScene.enableKey(event.key);
}
//
function handleKeyUp(event) {
  gameScene.disableKey(event.key);
}
//
//function launchAsteroids() {
//  eventInterval = setInterval(createAstroid, 300)
//}
//
//var gameEvents = [];
//
//function createEvent(x, y, height, funktion) {
//
//  var gameEvent = new GameEvent(x * BLOCK_WIDTH, y, 1, height * BLOCK_HEIGHT, funktion);
//  gameEvent.element = gameEvent.build(CAMERA)
//  gameEvent.draw(CAMERA)
//
//  gameEvents.push(gameEvent); // Gegner zum walls-Array hinzufügen
//
//}
//
//var asteroids = [];
//
//function createAstroid() {
//  var speed = Math.floor(Math.random() * enemySpeed) + 3
//  var y = Math.floor(Math.random() * (15 * BLOCK_HEIGHT));
//  var size = Math.floor(Math.random() * 30) + 10;
//  var asteroid = new Asteroid(31 * BLOCK_WIDTH, y, size, size, speed);
//  asteroid.element = asteroid.build();
//  asteroid.draw(CAMERA);
//
//  asteroids.push(asteroid)
//}
//
//// Funktion für den Spiel-Loop
//
//
//
//
//
//function moveEvents() {
//  for (var i = 0; i < gameEvents.length; i++) {
//    var event = gameEvents[i];
//    var currentLeft = parseInt(event.element.style.left);
//    var newLeft = currentLeft - enemySpeed;
//    event.element.style.left = newLeft + 'px';
//  }
//}
//
//
//
//function moveAsteroids() {
//  for (var i = 0; i < asteroids.length; i++) {
//    var asteroid = asteroids[i];
//    var currentLeft = parseInt(asteroid.element.style.left);
//    var newLeft = currentLeft - asteroid.speed;
//    asteroid.element.style.left = newLeft + 'px';
//  }
//}
//
//
//function eventCollision(spaceshipRect, array) {
//  for (var i = 0; i < array.length; i++) {
//    var element = array[i];
//    var elementRect = element.element.getBoundingClientRect();
//
//    if (intersect(spaceshipRect, elementRect)) {
//      // Kollision zwischen Raumschiff und Gegner
//      element.funktion()
//      console.log('Finish!');
//    }
//  }
//}
//
//
////hier die dustirbsmethode für gegner / projektiele     !!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
//function endGame() {
//  // Stoppe das Spiel, z.B. indem du den gameLoop beendest oder den Interval für die Gegnererzeugung stoppst
//
//
//  // Zeige den Highscore an
//  var scoreElement = document.createElement('div');
//  scoreElement.className = 'score';
//  scoreElement.innerHTML = 'Game Over! Dein Score: ' + score;
//
//  var reloadButton = document.createElement('button');
//  reloadButton.textContent = 'New Game!';
//  reloadButton.addEventListener('click', function () {
//    location.reload();
//  });
//
//  scoreElement.appendChild(reloadButton);
//  CAMERA.appendChild(scoreElement);
//  clearInterval(eventInterval)
//  gameover = true
//}
//
//
//
//
//// Das Spiel initialisieren, wenn das Dokument vollständig geladen ist
//window.addEventListener("load", initGame);
//
//
//
//
//function createTutorialLevel() {
//
//  //boden und decke
//  createWall(0, 0, 50, 2)
//  createWall(0, 14, 50, 2)
//
//  //Wände
//
//  createWall(15, 0, 1, 7)
//  createWall(30, 6, 1, 8)
//  createWall(40, 0, 1, 10)
//  createWall(40, 9, 6, 1)
//  createWall(49, 5, 1, 10)
//  createWall(44, 5, 6, 1)
//
//  //gegner
//
//  createAstroid()
//
//  createEvent(50, 0, 16, launchAsteroids)
//
//
//
//}
//
//
//function createLevelOne() {
//
//
//
//
//  //boden und decke
//  createWall(15, 0, 35, 2)
//  createWall(15, 14, 35, 2)
//  createWall(75, 0, 35, 2)
//  createWall(75, 14, 35, 2)
//
//
//  //wände
//  createWall(17, 8, 1, 8)
//  createWall(25, 0, 1, 6)
//  createWall(30, 9, 1, 9)
//  createWall(35, 0, 1, 5)
//  createWall(80, 4, 1, 12)
//  createWall(100, 0, 1, 11)
//
//  //einzelne unzerstöbare gegner
//  createBrick(55, 5)
//  createBrick(55, 8)
//  createBrick(55, 11)
//  createBrick(55, 2)
//  createBrick(55, 14)
//
//  createBrick(110, 3)
//  createBrick(111, 4)
//  createBrick(112, 5)
//  createBrick(113, 6)
//  createBrick(114, 7)
//  createBrick(115, 8)
//  createBrick(114, 9)
//  createBrick(113, 10)
//  createBrick(112, 11)
//  createBrick(111, 12)
//  createBrick(110, 13)
//
//
//
//
//
//
//}
//