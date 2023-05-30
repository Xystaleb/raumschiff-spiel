
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
  checkCollision();

  // Spiel-Loop wiederholen
  requestAnimationFrame(gameLoop);
}

// Funktion zum Bewegen des Raumschiffs
function moveSpaceship() {
  spaceship.y += spaceshipMovement * 5; // Geschwindigkeit der Bewegung anpassen
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
      left = Math.floor(Math.random() * (gameArea.width - 50));
      validPosition = checkCollision(top, left);
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
    if (currentLeft <= -50) {
      // Gegner außerhalb des Bildschirms, entfernen
      document.body.removeChild(enemy);
      enemies.splice(i, 1);
      i--;
      enemyCount--; // Verringere den Zähler für die erzeugten Gegner
    } else {
      // Gegner nach links bewegen
      enemy.style.left = currentLeft - 5 + 'px'; // Ändere die Geschwindigkeit bei Bedarf
    }
  }
}


// Funktion zur Kollisionsprüfung
function checkCollision(top, left) {
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
function handleKeyDown(event) {
  if (event.key === 'ArrowUp' || event.key === 'w') {
    spaceshipMovement = -1; // Bewegung nach oben
  } else if (event.key === 'ArrowDown' || event.key === 's') {
    spaceshipMovement = 1; // Bewegung nach unten
  }
}

function handleKeyUp(event) {
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'w' || event.key === 's') {
    spaceshipMovement = 0; // Bewegung stoppen
  }
}

// Das Spiel initialisieren, wenn das Dokument vollständig geladen ist
window.addEventListener("load", initGame);
