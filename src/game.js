import Ship from "./models/ship.js";
import Enemy from "./models/enemy.js";
import { Wall } from "./models/wall.js";



const BLOCK_WIDTH = 50;
const BLOCK_HEIGHT = 50;

var spaceship = new Ship(
  0,
  0,
  BLOCK_WIDTH,
  BLOCK_HEIGHT
);


var spaceshipSpeed = 5;
var enemySpeed = 5;


// Maximale Anzahl der Gegner pro Level

// Zähler für die erzeugten Gegner


var score = 30;

var keys = {};

var enemyWidth = 50; // Beispielwert, ersetze ihn mit deiner gewünschten Breite für die Gegner
var enemyHeight = 50; // Beispielwert, ersetze ihn mit deiner gewünschten Breite für die Gegner
var enemySpeed = 5;

function handleKeyDown(event) {
  keys[event.key] = true;
}

function handleKeyUp(event) {
  keys[event.key] = false;
}



function createEnemy(x, y) {
  var enemy = new Enemy(x * BLOCK_WIDTH, y * BLOCK_WIDTH, enemySpeed);

  var enemyElement = document.createElement('div');
  enemyElement.className = 'enemy';
  enemyElement.style.position = 'absolute';
  enemyElement.style.top = enemy.y + 'px';
  enemyElement.style.left = enemy.x + 'px';
  enemyElement.style.width = enemyWidth + 'px';
  enemyElement.style.height = enemyHeight + 'px';
  // Weitere Stilzuweisungen für den Gegner können hier erfolgen

  enemy.element = enemyElement;
  document.body.appendChild(enemyElement);

  enemies.push(enemy); // Gegner zum enemies-Array hinzufügen
}

function createWall(x, y, width, height) {
  var wall = new Wall(x * BLOCK_WIDTH, y * BLOCK_HEIGHT, width * BLOCK_WIDTH, height * BLOCK_HEIGHT);
  wall.element = wall.build(document)
  wall.draw(document)

  enemies.push(wall); // Gegner zum enemies-Array hinzufügen

}

// Gegner-Array
var enemies = [];

// Spielfeld-Größe
var gameArea = {
  width: 225 * BLOCK_WIDTH,
  height: 5 * BLOCK_HEIGHT
};

// Funktion zum Initialisieren des Spiels
function initGame() {
  // Raumschiff erstellen
  spaceship.element = spaceship.build(document); // Das Raumschiff-Element erstellen
  spaceship.draw(document);
  // document.body.appendChild(spaceship.element); // Das Raumschiff-Element der HTML-Seite hinzufügen

  // Event-Handler für Tastatureingaben registrieren
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);

  // Beispiel für die Erzeugung eines Gegners alle 2 Sekunden
  createLevelOne();
  // Spiel-Loop starten
  gameLoop();
}

// Funktion für den Spiel-Loop
function gameLoop() {
  // Raumschiff bewegen

  moveSpaceship();

  // Gegner bewegen
  moveEnemies();

  // Kollisionsprüfung
  checkCollisions();

  // Spiel-Loop wiederholen
  requestAnimationFrame(gameLoop);
}

// Funktion zum Bewegen des Raumschiffs
function moveSpaceship() {
  if (keys['ArrowUp']) {
    // Bewegungslogik für nach oben
    spaceship.y -= spaceshipSpeed;
  }
  if (keys['ArrowDown']) {
    // Bewegungslogik für nach unten
    spaceship.y += spaceshipSpeed;
  }
  if (spaceship.y<=0){
    spaceship.y=0
  }

  if (spaceship.y>=BLOCK_HEIGHT*13){
    spaceship.y=BLOCK_HEIGHT*14
  }
  spaceship.element.style.top = spaceship.y + 'px';
}

// Funktion zum Bewegen der Gegner
function moveEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];
    var currentLeft = parseInt(enemy.element.style.left);
    var newLeft = currentLeft - enemySpeed;
    enemy.element.style.left = newLeft + 'px';
  }
}

// Funktion zur Kollisionsprüfung
function checkCollisions() {
  var spaceshipRect = spaceship.element.getBoundingClientRect();

  for (var i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];
    var enemyRect = enemy.element.getBoundingClientRect();

    if (rectIntersect(spaceshipRect, enemyRect)) {
      // Kollision zwischen Raumschiff und Gegner
      // Hier kannst du deine gewünschte Logik für die Kollision implementieren
      console.log('Kollision!');
      endGame();
      break; // Beende die Schleife, da das Spiel vorbei ist
    }
  }
}

function endGame() {
  // Stoppe das Spiel, z.B. indem du den gameLoop beendest oder den Interval für die Gegnererzeugung stoppst
  cancelAnimationFrame(animationId);
  clearInterval(enemyInterval);

  // Zeige den Highscore an
  var scoreElement = document.createElement('div');
  scoreElement.className = 'score';
  scoreElement.innerHTML = 'Game Over! Dein Score: ' + score;
  document.body.appendChild(scoreElement);

}

// Hilfsfunktion zur Überprüfung von Kollisionen zwischen zwei Rechtecken
function rectIntersect(r1, r2) {
  return (
    r1.left < r2.right &&
    r1.right > r2.left &&
    r1.top < r2.bottom &&
    r1.bottom > r2.top
  );
}

document.addEventListener("keydown", handleKeyDown);

document.addEventListener("keyup", handleKeyUp);

// Das Spiel initialisieren, wenn das Dokument vollständig geladen ist
window.addEventListener("load", initGame);

function createBaum(x, y) {
  for (y; y <= 15; y++) {
    createEnemy(x, y)
  }
}

function createEiszapfen(x, y) {
  for (y; y >= 0; y--) {
    createEnemy(x, y)
  }
}



function createLevelOne() {
  createWall(15, 0, 35, 2)
  createWall(15, 13, 35, 2)
  createWall(17,8,1,8)
  createWall(25,0,1,6)  
  createWall(30,9,1,9)
  createWall(35,0,1,5)
  createWall(80,4,1,12)
  createWall(100,0,1,11)

  createEnemy(55,5)
  createEnemy(55,8)
  createEnemy(55,11)
  createEnemy(55,2)
  createEnemy(55,14)

  createWall(75, 0, 35, 2)
  createWall(75, 13, 35, 2)

 createEnemy(110,3)
 createEnemy(111,4)
 createEnemy(112,5)
 createEnemy(113,6)
 createEnemy(114,7)
 createEnemy(115,8)
  createEnemy(114,9)
  createEnemy(113,10)
  createEnemy(112,11)
  createEnemy(111,12)
  createEnemy(110,13)




}
