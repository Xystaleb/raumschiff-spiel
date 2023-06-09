import Asteroid from "../models/astroids.js";
import Ship from "../models/ship.js";
import Wall from "../models/wall.js";
import Scene from "./scene.js";
import Projectile from "../models/projectile.js";

export default class GameScene extends Scene {

    constructor(view) {

        super(view);
        this.ratio = view.offsetWidth / view.offsetHeight;
        console.log(this.ratio);
        this.gameOver = false;
        this.LevelCounter = 5

        this.canShoot = true;
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
        fetch(`../assets/Level${this.LevelCounter}.json`)
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
        this.gameObjects = [];
        this.events = [];
        const BLOCK_WIDTH = 50;
        const BLOCK_HEIGHT = 50;
        this.gameObjects.push(this.spaceship);
        Level.finish.x = Level.finish.x * BLOCK_WIDTH
        this.events.push(Level.finish)

        if (Level.walls !== undefined) {
            for (let i = 0; i < Level.walls.length; i++) {
                let WALL = Level.walls[i];
                this.createWall(WALL.x, WALL.y, WALL.width, WALL.height)
            }
        }

        if (Level.asteroids !== undefined) {
            for (let i = 0; i < Level.asteroids.length; i++) {
                const asteroid = Level.asteroids[i];
                this.createAsteroid(asteroid.x, asteroid.y, asteroid.size, asteroid.speed)
            }
        }

        if (Level.randomSize !== undefined) {
            for (let i = 0; i < Level.randomSize.length; i++) {
                const asteroid = Level.randomSize[i];
                const size = Math.random() * (BLOCK_WIDTH-10)+10
                this.createAsteroid(asteroid.x, asteroid.y, size, asteroid.speed)
            }
        }

        if (Level.asteroidSpawners !== undefined) {
            for (let i = 0; i < Level.asteroidSpawners.length; i++) {
                Level.asteroidSpawners[i].x = Level.asteroidSpawners[i].x * BLOCK_WIDTH
                this.events.push(Level.asteroidSpawners[i]);
            }
        }

        this.LevelCounter += 1


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
        this.moveEvents();
        this.updateProjectiles();
        // Gegner bewegen
        // this.moveEvents.bind(this);
        // this.moveAsteroids.bind(this);
        // Kollisionsprüfung
        this.checkCollisions();
        this.checkEvents();

        this.nextLevel();
        // Spiel-Loop wiederholen
        if (!this.gameOver)
            requestAnimationFrame(this.loop.bind(this));
    }

    checkEvents() {
        if (this.events !== undefined) {
            for (let i = 1; i < this.events.length; i++) {
                const element = this.events[i];
                if (element.type == "spawner")
                if (element.x <= 0) {
                    this.startAsteroidSpawner();
                    this.events.splice(i, 1)
                    break;
                }
            }
        }
    }

    nextLevel() {
        const BLOCK_WIDTH = 50
        if (this.events[0] != null && this.events[0] != undefined) {
            var finish = this.events[0]
            if (finish.x <= 0) {
                this.spaceship.x = 0
                console.log(`start level: ${this.LevelCounter}`)
                fetch(`../assets/Level${this.LevelCounter}.json`)
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
        console.log(wall.x)
        this.gameObjects.push(wall); // Gegner zum walls-Array hinzufügen
        super.build()
    }

    createAsteroid(x, y, size, speed) {
        const BLOCK_WIDTH = 50;
        const BLOCK_HEIGHT = 50;
        let asteroid = new Asteroid(
            x * BLOCK_WIDTH,
            y * BLOCK_HEIGHT,
            size,
            -speed
        )
        asteroid.build();
        this.gameObjects.push(asteroid);

        super.build();
    }


    createRandomAsteroid() {
        const asteroidSize = Math.floor(Math.random() * 30) + 10;
        const asteroidSpeed = Math.random() * 10;
        console.log("Asteroid created");
        let asteroid = new Asteroid(
            this.view.offsetWidth,
            Math.floor(Math.random() * (this.view.offsetHeight - asteroidSize)),
            asteroidSize,
            -asteroidSpeed
        )
        asteroid.build();
        this.gameObjects.push(asteroid);

        super.build();

    }

    createProjectile() {
        if (this.canShoot) {
            const projectile = new Projectile(
                this.spaceship.x + this.spaceship.width,
                this.spaceship.y + this.spaceship.height / 2,
                10,
                4
            );
            projectile.build();
            this.projectiles.push(projectile);
            super.build();
            this.canShoot = false;

            // Verzögerung für den nächsten Schuss
            setTimeout(() => {
                this.canShoot = true;
            }, 500); // 500 Millisekunden Verzögerung
        }
    }

    updateProjectiles() {
        const projectilesToDelete = []
        console.log(this.projectiles.length)
        this.projectiles.forEach((projectile,idx) => {
            console.log(projectile.x)
            if (projectile.x <= this.view.offsetWidth) {
                projectile.x += 2;
            } else {
               // projectilesToDelete.push(idx);
            }
             projectile.update();
        });
        for(const idx of projectilesToDelete){
            this.projectiles[idx].element.remove();
            this.projectiles.splice(idx,1);
        }
        super.build();
    }

    moveEvents() {
        for (var i = 0; i < this.events.length; i++) {

            var event = this.events[i];
            var newLeft = event.x;
            event.x = newLeft - 2;
        }
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

    moveAsteroids() {
        const asteroidsToDelete = [];
        this.gameObjects.forEach((gameObject,idx) => {
            if (gameObject instanceof Asteroid) {

                let asteroid = gameObject;
                asteroid.x += asteroid.speed;

                // Überprüfe, ob der Asteroid das Spielfeld verlassen hat
                if (asteroid.x + asteroid.width < 0) {
                    // Asteroid hat das Spielfeld verlassen, daher entfernen
                    asteroidsToDelete.push(idx)

                } else {
                    // Aktualisiere die Position des Asteroiden im DOM
                    asteroid.update();
                }
            }
        });
        for( const idx of asteroidsToDelete ){
            this.gameObjects[idx].element.remove();
            this.gameObjects.splice(idx,1)
        }
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
                    console.log("boom")
                    console.log(this.spaceship.x, this.spaceship.y, elementRect.x, elementRect.y)
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
        if (this.keys[' '] && this.canShoot) {
            // Schießen eines Projektils
            this.createProjectile();
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