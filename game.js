
var spaceship = {
  element: null,
  x: 0,
  y: 0,
  width: 50,
  height: 50
};

var spaceshipMovement = 0;

// Maximale Anzahl der Gegner pro Level
var maxEnemies = 10;
// Zähler für die erzeugten Gegner
var enemyCount = 0;

var keys = {};

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
  var x = gameArea.width; // Startposition des Gegners (rechter Bildschirmrand)
  var y = Math.random() * (gameArea.height - 50); // Zufällige y-Position des Gegners
  var speed = Math.random() * 5 + 1; // Zufällige Geschwindigkeit des Gegners
  var enemy = new Enemy(x, y, speed);

  var enemyElement = document.createElement('div');
  enemyElement.className = 'enemy';
  enemyElement.style.position = 'absolute';
  enemyElement.style.top = enemy.y + 'px';
  enemyElement.style.left = enemy.x + 'px';
  // Weitere Stilzuweisungen für den Gegner können hier erfolgen

  enemy.element = enemyElement;
  document.body.appendChild(enemyElement);

  enemies.push(enemy); // Gegner zum enemies-Array hinzufügen
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
  setInterval(createEnemy, 2000);


  // Spiel-Loop starten
  gameLoop();
}



// Funktion für den Spiel-Loop
function gameLoop() {
  // Raumschiff bewegen
  moveSpaceship();

  // Gegner erzeugen
  createEnemy();

  // Gegner bewegen
  moveEnemies();

  // Kollisionsprüfung
  checkCollisions();

  // Spiel-Loop wiederholen
  requestAnimationFrame(gameLoop);
}

// Funktion zum Bewegen des Raumschiffs
function moveSpaceship() {
  // Überprüfe den Zustand der Tastatureingaben
  if (keys.ArrowUp) {
    spaceship.y -= spaceshipSpeed;
  }
  if (keys.ArrowDown) {
    spaceship.y += spaceshipSpeed;
  }

  // Aktualisiere die Position des Raumschiffs im DOM
  spaceship.element.style.top = spaceship.y + 'px';
}


// Funktion zur Erzeugung von Gegnern
function createEnemy() {
  if (enemyCount < maxEnemies) {
    var enemy = document.createElement('div');
    enemy.className = 'enemy';
    enemy.style.position = 'absolute';

    var validPosition = false;
    var top, left;

    // Überprüfe, ob die generierte Position mit vorhandenen Gegnern kollidiert
    while (!validPosition) {
      top = Math.floor(Math.random() * (gameArea.height - 50));
      left = gameArea.width - 50;
      validPosition = checkCollisions(top, left);
    }

    enemy.style.top = top + 'px';
    enemy.style.left = left + 'px';
    enemy.style.width = '50px';
    enemy.style.height = '50px';
    document.body.appendChild(enemy);
    enemies.push(enemy);
    enemyCount++; // Erhöhe den Zähler für die erzeugten Gegner
  }
}


// Funktion zum Bewegen der Gegner
function moveEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];
    var currentLeft = parseInt(enemy.style.left);
    var newLeft = currentLeft - enemySpeed;
    enemy.style.left = newLeft + 'px';

    // Überprüfe, ob der Gegner den linken Rand des Spielfelds erreicht hat
    if (newLeft <= 0) {
      enemy.parentNode.removeChild(enemy); // Entferne den Gegner aus dem DOM
      enemies.splice(i, 1); // Entferne den Gegner aus dem enemies-Array
      enemyCount--; // Verringere den Zähler für die erzeugten Gegner
      i--; // Verringere den Index, da ein Element aus dem Array entfernt wurde
    }
  }
}


// Funktion zur Kollisionsprüfung
function checkCollisions(top, left) {
  for (var i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];
    var enemyTop = parseInt(enemy.style.top);
    var enemyLeft = parseInt(enemy.style.left);
    
    if (
      top >= enemyTop - 50 &&
      top <= enemyTop + 50 &&
      left >= enemyLeft - 50 &&
      left <= enemyLeft + 50
    ) {
      return false; // Kollision gefunden, Position ist ungültig
    }
  }
  
  return true; // Keine Kollisionen gefunden, Position ist gültig
}

// Event-Handler für Tastatureingaben


// Event-Handler für Tastatur-Eingabe
function handleKeyDown(event) {
  keys[event.key] = true;
}

function handleKeyUp(event) {
  keys[event.key] = false;
}

// Das Spiel initialisieren, wenn das Dokument vollständig geladen ist
window.addEventListener("load", initGame);
