
//Variablen

const gameWindow = document.querySelector('.space');

let shipSpeed = 3;

let canShoot = true;






//_____________________Objekte__________________________________________________________________________________________________
let keys = {}; //Speichert den status keyup / down

let projectiles = []; // Array für Projektile

let asteroids = [];



let ship = {
  element: null,
  width: 30,
  height: 20,
  boosting: false,
  x: 100,
  y: 100,

};




//________________________________________Funktionen________________________________________________________________________


function createShip() {
  ship.element = document.createElement('div');
  ship.element.className = 'ship';
  ship.element.style.position = 'absolute';
  ship.element.style.width = '30px'
  ship.element.style.height = '20px'
  ship.element.style.top = '200px';
  ship.element.style.left = '50px';

  // Weitere Stilzuweisungen für das Raumschiff können hier erfolgen
  return ship.element;
}

function newAsteroid() {
  const asteroidSize = Math.floor(Math.random() * 30) + 10; // Zufällige Größe zwischen 10 und 40
  const asteroidSpeed = Math.random() * shipSpeed;
  const asteroid = {
    element: null,
    x: gameWindow.offsetWidth, // Startposition auf der rechten Seite des Spielfelds
    y: Math.floor(Math.random() * (gameWindow.offsetHeight - asteroidSize)),
    xSpeed: -asteroidSpeed, // Immer nach links fliegen
    ySpeed: 0, // Keine vertikale Geschwindigkeit
    size: asteroidSize
  };
  return asteroid;
}

function createAsteroids() {
  if (asteroids.length <= 2) {
    for (let i = 0; i < 5; i++) {
      const asteroid = newAsteroid();
      asteroid.element = document.createElement('div');
      asteroid.element.className = 'asteroid';
      asteroid.element.style.position = 'absolute';
      asteroid.element.style.width = asteroid.size + 'px';
      asteroid.element.style.height = asteroid.size + 'px';
      asteroid.element.style.borderRadius = '50%'; // Runde Form
      asteroid.element.style.top = asteroid.y + 'px';
      asteroid.element.style.left = asteroid.x + 'px';

      gameWindow.appendChild(asteroid.element);
      asteroids.push(asteroid);
    }
  }
}

function updateAsteroids() {
  asteroids.forEach((asteroid) => {
    // Aktualisiere die Position des Asteroiden basierend auf seiner Geschwindigkeit
    asteroid.x += asteroid.xSpeed;

    // Überprüfe, ob der Asteroid die linke Seite des Spielfelds erreicht hat
    if (asteroid.x + asteroid.size < 0) {
      // Asteroid hat das Spielfeld verlassen, daher entfernen
      asteroid.element.remove();
      asteroids = asteroids.filter((a) => a !== asteroid);
    } else {
      // Aktualisiere die Position des Asteroiden im DOM
      asteroid.element.style.left = asteroid.x + 'px';
    }
  });

}




function createProjectile() {
  const projectile = document.createElement('div');
  projectile.className = 'projectile';
  projectile.style.position = 'absolute';
  projectile.style.top = ship.y + ship.height/2 + 'px';
  projectile.style.left = ship.x + ship.element.offsetWidth + 'px'; //so wird immer aus dem schiff geschossen

  gameWindow.appendChild(projectile);
  projectiles.push(projectile);
}

function updateProjectiles() {
  projectiles.forEach((projectile) => {
    const currentLeft = parseInt(projectile.style.left);
    const newLeft = currentLeft + shipSpeed;

    // Überprüfen, ob das Projectile den maximalen x-Wert erreicht hat
    if (newLeft <= gameWindow.offsetWidth) {
      projectile.style.left = newLeft + 'px'; // Solange true bis maxwidth des gamewindows
    } else {
      // Projectile hat den maximalen x-Wert erreicht, daher entfernen
      projectile.remove();
      projectiles = projectiles.filter((p) => p !== projectile); // array sortiert false projectiles aus
    }
  });
}



function checkCollision() {
  const shipRect = ship.element.getBoundingClientRect();

  asteroids.forEach((asteroid, asteroidIndex) => {
    const asteroidRect = asteroid.element.getBoundingClientRect();

    if (
        shipRect.left < asteroidRect.right &&
        shipRect.right > asteroidRect.left &&
        shipRect.top < asteroidRect.bottom &&
        shipRect.bottom > asteroidRect.top
    ) {
      // Kollision mit Raumschiff erkannt - Spiel vorbei
      gameOver();
    }

    projectiles.forEach((projectile, projectileIndex) => {
      const projectileRect = projectile.getBoundingClientRect();

      if (
          projectileRect.left < asteroidRect.right &&
          projectileRect.right > asteroidRect.left &&
          projectileRect.top < asteroidRect.bottom &&
          projectileRect.bottom > asteroidRect.top
      ) {
        // Kollision mit Projektil erkannt - Asteroid entfernen
        asteroids.splice(asteroidIndex, 1); // Asteroid aus dem Array entfernen
        asteroid.element.remove(); // Asteroid-Element aus dem DOM entfernen

        projectiles.splice(projectileIndex, 1); // Projektil aus dem Array entfernen
        projectile.remove(); // Projektil-Element aus dem DOM entfernen
      }
    });
  });
}


function gameOver() {
  ship.element.remove(); // Entferne das Raumschiff-Element
  document.removeEventListener("keydown", handleKeyDown); // Entferne den Event-Listener für keydown
  document.removeEventListener("keyup", handleKeyUp); // Entferne den Event-Listener für keyup
  canShoot = false; // Deaktiviere das Schießen von Projektilen



}




//________________________________________Spielfluss________________________________________________________________________

function initGame() {

  // Raumschiff erstellen
  ship.element = createShip(); // Das Raumschiff-Element erstellen
  gameWindow.appendChild(ship.element); // Das Raumschiff-Element der HTML-Seite hinzufügen

  // Event-Handler für Tastatureingaben registrieren
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);

  // Spiel-Loop starten
  gameLoop();
}

function gameLoop() {

  // Raumschiff bewegen
  moveShip();


  updateAsteroids();

  createAsteroids();


  updateProjectiles();

  checkCollision();

  // Spiel-Loop wiederholen
  requestAnimationFrame(gameLoop);
}





//______________________________________Handling__________________________________________________________________________


function moveShip() {




  if (keys['ArrowUp']) {
    // Bewegungslogik nach oben
    if (ship.y > 15) {
      ship.y -= shipSpeed;
    }
  }

  if (keys['ArrowDown']) {
    // Bewegungslogik nach unten
    if (ship.y + ship.element.offsetHeight < gameWindow.offsetHeight) {
      ship.y += shipSpeed;
    }
  }

  if (keys['ArrowLeft']) {
    // Bewegungslogik nach links
    if (ship.x > 20) {
      ship.x -= shipSpeed;
    }
  }

  if (keys['ArrowRight']) {
    // Bewegungslogik nach rechts
    if (ship.x + ship.element.offsetWidth < gameWindow.offsetWidth) {
      ship.x += shipSpeed;
    }
  }
  if (keys[' '] && canShoot) {
    // Schießen eines Projektils
    createProjectile();
    canShoot = false;

    // Festlegen des Intervalls, in dem weitere Schüsse abgefeuert werden können (z.B. 500ms)
    setTimeout(() => {
      canShoot = true;
    }, 300);
  }




  ship.element.style.top = ship.y + 'px';
  ship.element.style.left = ship.x + 'px';
}


// Tastendruckhandling
function handleKeyDown(event) {
  keys[event.key] = true;
}
function handleKeyUp(event) {
  keys[event.key] = false;
}


//___________________________________Gameloop__________________________________________________________________________________

window.addEventListener("load", initGame);
