import Asteroid from "../models/astroids.js";
import Ship from "../models/ship.js";
import Wall from "../models/wall.js";
import Scene from "./scene.js";

export default class GameScene extends Scene {
    constructor(view) {

        super(view);
        this.ratio = view.offsetWidth / view.offsetHeight;
        console.log(this.ratio);
        this.gameOver = false;
    
    }

    draw() {
        super.draw();
    }

    handleKeyDown(event) {
        this.keys[event.key] = true;
    }

    handleKeyUp(event) {
        this.keys[event.key] = false;
    }

    build() {
        // register eventhandlers
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        document.addEventListener("keyup", this.handleKeyUp.bind(this));

        console.log("Asteroid spawner started"); // Überprüfung



        const BLOCK_WIDTH = 50;
        const BLOCK_HEIGHT = 50;
        this.spaceship = new Ship(
            BLOCK_WIDTH,
            8 * BLOCK_HEIGHT,
            this.ratio
        );
        this.spaceship.build();
        this.gameObjects.push(this.spaceship);



        //holen der LevelDatei
        fetch('../assets/LevelOne.json')
        .then(response => response.json())
        .then(data => {
      
          //Laden des Levels
          this.loadLevel(data);
        })
        .catch(error => {
          console.error('Fehler beim Laden der JSON-Datei:', error);
        });

        console.log(this.gameObjects)

    }



    loadLevel(Level) {
        this.gameObjects = []
        const BLOCK_WIDTH = 50;
        const BLOCK_HEIGHT = 50;
        this.gameObjects.push(this.spaceship);

        for (let i = 0; i < Level.walls.length; i++) {
            let WALL = Level.walls[i];
            console.log(WALL.x)
            this.createWall(WALL.x, WALL.y, WALL.width, WALL.height)
        }

        this.startAsteroidSpawner();

       
    }

    createTutorialLevel() {
        //boden und decke
        this.createWall(0, 0, 50, 2)
        this.createWall(0, 14, 50, 2)

        //Wände
        this.createWall(15, 0, 1, 7)
        this.createWall(30, 6, 1, 8)
        this.createWall(40, 0, 1, 10)
        this.createWall(40, 9, 6, 1)
        this.createWall(49, 5, 1, 10)
        this.createWall(44, 5, 6, 1)

        //gegner
        // createEvent(50, 0, 16, launchAsteroids)
    }

    // game loop
    loop() {
        // Raumschiff bewegen
        this.moveSpaceship();
        this.checkBoundaries();
        this.moveWall();
        this.moveAsteroids();
        console.log(this.gameObjects);

        // Gegner bewegen
        // this.moveEvents.bind(this);
        // this.moveAsteroids.bind(this);
        // Kollisionsprüfung
        this.checkCollisions();

        this.nextLevel();
        // Spiel-Loop wiederholen
        if (!this.gameOver)
            requestAnimationFrame(this.loop.bind(this));
    }

    nextLevel() {
        const BLOCK_WIDTH=50
        console.log(this.spaceship.x)
        if (this.spaceship.x > this.view.offsetwidth+20){
            this.spaceship.x=0
            console.log("start next level")
            
            
            fetch('../assets/LevelTwo.json')
            .then(response => response.json())
            
            .then()
            .then(data => {
          
              //Laden des Levels
              this.loadLevel(data);
            }).then()
            .catch(error => {
              console.error('Fehler beim Laden der JSON-Datei:', error);
            });

        }
    }

    createWall(x, y, width, height) {
        const BLOCK_WIDTH = 50;
        const BLOCK_HEIGHT = 50;
        var wall = new Wall(
            x * BLOCK_WIDTH,
            y * BLOCK_HEIGHT,
            width * BLOCK_WIDTH,
            height * BLOCK_HEIGHT
        );
        wall.build();
        this.gameObjects.push(wall); // Gegner zum walls-Array hinzufügen
        super.build()
    }


    createRandomAsteroid() {
        const asteroidSize = Math.floor(Math.random() * 30) + 10;
        const asteroidSpeed = Math.random() * 10;
        console.log("Asteroid created");
        let asteroid = new Asteroid(
            this.view.offsetWidth,
            Math.floor(Math.random() * (this.view.offsetHeight - asteroidSize)),
            asteroidSize,
            asteroidSize,
            -asteroidSpeed
        )
        asteroid.build();
        this.gameObjects.push(asteroid);
         
        super.build();
    }


    moveWall() {
        for (var i = 0; i < this.gameObjects.length; i++) {
            if (this.gameObjects[i] instanceof Wall) {
                var wall = this.gameObjects[i];
                var newLeft = wall.x;
                wall.x = newLeft - 2;
                wall.update();
            }
        }
    }
/*
    moveAsteroids() {
        for (var i = 0; i < asteroids.length; i++) {
            var asteroid = asteroids[i];
            var currentLeft = parseInt(asteroid.element.style.left);
            var newLeft = currentLeft - asteroid.speed;
            asteroid.element.style.left = newLeft + 'px';
        }
    }
   */

        moveAsteroids()
        {
            this.gameObjects.forEach((gameObject) => {
                if (gameObject instanceof Asteroid) {
                    console.log("Asteroid updated")
                    let asteroid = gameObject;
                    asteroid.x += asteroid.speed;
                    console.log("Asteroid updated2")
                    // Überprüfe, ob der Asteroid das Spielfeld verlassen hat
                    if (asteroid.x + asteroid.width < 0) {
                        // Asteroid hat das Spielfeld verlassen, daher entfernen
                        asteroid.element.remove();
                        this.gameObjects = this.gameObjects.filter((obj) => obj !== asteroid);
                    } else {
                        // Aktualisiere die Position des Asteroiden im DOM
                        asteroid.update();
                    }
                }
            });
        }

    startAsteroidSpawner() {
        this.asteroidSpawner = setInterval(() => {
            this.createRandomAsteroid();
        }, 500);
    }


    // Funktion zur Kollisionsprüfung
    checkCollisions() {
        console.log(this.gameObjects.length);
        for (var i = 0; i < this.gameObjects.length; i++) {
            var current = this.gameObjects[i];
            if (current instanceof Wall || current instanceof Asteroid) {
                var elementRect = current.element.getBoundingClientRect();
                if (this.spaceship.intersect(elementRect)) {
                    // Kollision zwischen Raumschiff und Gegner
                    endGame();
                    return;
                }
            }
        }
    }

    // eventCollision(spaceshipRect, array) {
    //     for (var i = 0; i < array.length; i++) {
    //         var element = array[i];
    //         var elementRect = element.element.getBoundingClientRect();

    //         if (intersect(spaceshipRect, elementRect)) {
    //             // Kollision zwischen Raumschiff und Gegner
    //             element.funktion()
    //             console.log('Finish!');
    //         }
    //     }
    // }
    checkBoundaries() {
        const bounding_box = this.view.getBoundingClientRect();
        const spaceship = this.spaceship;

        if (this.spaceship.x <= 0) {
            this.spaceship.x = 0
        }

        if (spaceship.x >= bounding_box.width - spaceship.width) {
            console.log(this.spaceship.x, bounding_box.width);
            spaceship.x = bounding_box.width - spaceship.width;
        }

        if (spaceship.y <= 0) {
            spaceship.y = 0
        }

        if (spaceship.y >= bounding_box.height - spaceship.height) {
            spaceship.y = bounding_box.height - spaceship.height;
        }
    }

    moveSpaceship() {
        const spaceshipSpeed = 5;
        if (this.keys['ArrowUp']) {
            // Bewegungslogik für nach oben
            this.spaceship.y -= spaceshipSpeed;
        }
        if (this.keys['ArrowDown']) {
            // Bewegungslogik für nach unten
            this.spaceship.y += spaceshipSpeed;
        }

        if (this.keys['ArrowLeft']) {
            // Bewegungslogik für nach oben
            this.spaceship.x -= spaceshipSpeed;
        }
        if (this.keys['ArrowRight']) {
            // Bewegungslogik für nach unten
            this.spaceship.x += spaceshipSpeed;
        }
        this.spaceship.update();
    }

    gameOverCollision() {
        console.log(this.gameObjects.length);
        for (var i = 0; i < this.gameObjects; i++) {
            const current = array[i];
            // do not intersect with the ship
            if (current instanceof Ship)
                continue;
            const elementRect = current.element.getBoundingClientRect();

            if (this.spaceship.intersect(elementRect)) {
                // Kollision zwischen Raumschiff und Gegner
                console.log('Kollision!');
                endGame();
                break;
            }
        }
    }
    endGame() {
        // score in den local storage schreiben
        // und spaeter in der endGameScene wiederholen
        // und anzeigen
    }
}