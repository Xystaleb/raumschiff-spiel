var spaceship = {
  element: null,
  x: 0,
  y: 0,
  width: 50,
  height: 50
};

var enemyInterval;

var spaceshipSpeed = 5;

// Maximale Anzahl der Gegner pro Level
var maxEnemies = 10;
// Zähler für die erzeugten Gegner
var enemyCount = 0;

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


function createSpaceship() {
  spaceship.element = document.createElement('div');
  spaceship.element.className = 'spaceship';
  spaceship.element.style.position = 'absolute';
  spaceship.element.style.top = '200px';
  spaceship.element.style.left = '50px';
  spaceship.element.style.width = '50px';
  spaceship.element.style.height = '50px';
  // Weitere Stilzuweisungen für das Raumschiff können hier erfolgen
  return spaceship.element;
}

// Enemy-Objekt
function Enemy(x, y, speed) {
  this.element = null;
  this.x = x;
  this.y = y;
  this.speed = speed;
  // Weitere Eigenschaften des Gegners können hier hinzugefügt werden
}

function createEnemy() {
  var x = gameArea.width - enemyWidth; // Startposition des Gegners (rechter Bildschirmrand)
  var y = Math.random() * (gameArea.height - enemyHeight); // Zufällige y-Position des Gegners
  var enemy = new Enemy(x, y, enemySpeed);

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
  enemyCount++; // Erhöhe den Zähler für die erzeugten Gegner
}

// Gegner-Array
var enemies = [];

// Spielfeld-Größe
var gameArea = {
  width: window.innerWidth,
  height: window.innerHeight
};

// Funktion zum Initialisieren des Spiels
function initGame() {
  // Raumschiff erstellen
  spaceship.element = createSpaceship(); // Das Raumschiff-Element erstellen
  document.body.appendChild(spaceship.element); // Das Raumschiff-Element der HTML-Seite hinzufügen

  // Event-Handler für Tastatureingaben registrieren
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);

  // Beispiel für die Erzeugung eines Gegners alle 2 Sekunden
  enemyInterval  = setInterval(createEnemy, 400);
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
  spaceship.element.style.top = spaceship.y + 'px';
}

// Funktion zum Bewegen der Gegner
function moveEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];
    var currentLeft = parseInt(enemy.element.style.left);
    var newLeft = currentLeft - enemy.speed;
    enemy.element.style.left = newLeft + 'px';

    // Überprüfe, ob der Gegner den linken Rand des Spielfelds erreicht hat
    if (newLeft <= 0) {
      enemy.element.parentNode.removeChild(enemy.element); // Entferne den Gegner aus dem DOM
      enemies.splice(i, 1); // Entferne den Gegner aus dem enemies-Array
      enemyCount--; // Verringere den Zähler für die erzeugten Gegner
      i--; // Verringere den Index, da ein Element aus dem Array entfernt wurde
    }
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
