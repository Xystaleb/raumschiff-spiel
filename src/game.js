import Ship from "./models/ship.js";
import Enemy from "./models/enemy.js";
import { Wall } from "./models/wall.js";


var gameover = false
const BLOCK_WIDTH = 50;
const BLOCK_HEIGHT = 50;

var spaceship = new Ship(
  BLOCK_WIDTH,
  8 * BLOCK_HEIGHT,
  BLOCK_WIDTH,
  BLOCK_HEIGHT
);


var spaceshipSpeed = 10;
var enemySpeed = 5;


// Maximale Anzahl der Gegner pro Level

// Zähler für die erzeugten Gegner


var score = 30;

var keys = {};

var enemySpeed = 3;

function handleKeyDown(event) {
  keys[event.key] = true;
}

function handleKeyUp(event) {
  keys[event.key] = false;
}




function createEnemy(x, y) {
  var enemy = new Enemy(x * BLOCK_WIDTH, y * BLOCK_WIDTH);
  enemy.element = enemy.build(document)
  enemy.draw(document)

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
  createTutorialLevel();
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
  if (!gameover)
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

  if (keys['ArrowLeft']) {
    // Bewegungslogik für nach oben
    spaceship.x -= spaceshipSpeed;
  }
  if (keys['ArrowRight']) {
    // Bewegungslogik für nach unten
    spaceship.x += spaceshipSpeed;
  }

  if (spaceship.x <= 0) {
    spaceship.x = 0
  }

  if (spaceship.x >= BLOCK_WIDTH*30) {
    spaceship.x = BLOCK_WIDTH*30
  }

  if (spaceship.y <= 0) {
    spaceship.y = 0
  }

  if (spaceship.y >= BLOCK_HEIGHT * 15) {
    spaceship.y = BLOCK_HEIGHT * 15
  }

  spaceship.element.style.left = spaceship.x + 'px';
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


  // Zeige den Highscore an
  var scoreElement = document.createElement('div');
  scoreElement.className = 'score';
  scoreElement.innerHTML = 'Game Over! Dein Score: ' + score;

  var reloadButton = document.createElement('button');
  reloadButton.textContent = 'New Game!';
  reloadButton.addEventListener('click', function () {
    location.reload();
  });

  scoreElement.appendChild(reloadButton);
  document.body.appendChild(scoreElement);
  gameOver = true
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



// Das Spiel initialisieren, wenn das Dokument vollständig geladen ist
window.addEventListener("load", initGame);




function createTutorialLevel() {

  //boden und decke
  createWall(0, 0, 50, 2)
  createWall(0, 14, 50, 2)

  //Wände

  createWall(15, 0, 1, 7)
  createWall(30, 6, 1, 8)
  createWall(40, 0, 1, 10)
  createWall(40, 9, 6, 1)
  createWall(49, 5, 1, 10)
  createWall(44, 5, 6, 1)

  //gegner





}


function createLevelOne() {




  //boden und decke
  createWall(15, 0, 35, 2)
  createWall(15, 14, 35, 2)
  createWall(75, 0, 35, 2)
  createWall(75, 14, 35, 2)


  //wände
  createWall(17, 8, 1, 8)
  createWall(25, 0, 1, 6)
  createWall(30, 9, 1, 9)
  createWall(35, 0, 1, 5)
  createWall(80, 4, 1, 12)
  createWall(100, 0, 1, 11)

  //einzelne unzerstöbare gegner
  createEnemy(55, 5)
  createEnemy(55, 8)
  createEnemy(55, 11)
  createEnemy(55, 2)
  createEnemy(55, 14)

  createEnemy(110, 3)
  createEnemy(111, 4)
  createEnemy(112, 5)
  createEnemy(113, 6)
  createEnemy(114, 7)
  createEnemy(115, 8)
  createEnemy(114, 9)
  createEnemy(113, 10)
  createEnemy(112, 11)
  createEnemy(111, 12)
  createEnemy(110, 13)






}
