import Asteroid from "../models/asteroid.js";
import Ship from "../models/ship.js";
import Wall from "../models/wall.js";
import Scene from "./scene.js";

import { getStage } from "../level-helper.js";

export default class GameScene extends Scene {
    constructor(view) {
        super(view);
        this.ratio = view.offsetWidth / view.offsetHeight;
        this.sceneState = {
            stage: 1,
            currentStage: undefined,
            gameOver: false
        };
    }

    getSceneState(){
        return this.sceneState;
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

    async build() {
        // reset gameObjects and components
        this.components = [];
        this.gameObjects = [];

        // register eventhandlers
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        document.addEventListener("keyup", this.handleKeyUp.bind(this));

        const BLOCK_WIDTH = 50;
        const BLOCK_HEIGHT = 50;
        if (!this.spaceship) {
            this.spaceship = new Ship(
                BLOCK_WIDTH,
                8 * BLOCK_HEIGHT,
                this.ratio
            );
            this.spaceship.build();
        }
        this.gameObjects.push(this.spaceship);

        await this.initStage(this.sceneState.currentStage);
        super.build();
    }

    async initStage(){
        this.sceneState.stage = 1;
        this.sceneState.currentStage = await getStage(this.sceneState.stage);
        console.log(this.sceneState.currentStage.walls.length);
        for(const wallConfig of this.sceneState.currentStage.walls) {
            var wall = new Wall(
                wallConfig.x * 50, 
                wallConfig.y * 50 + this.ratio*50,
                wallConfig.width * 50, 
                wallConfig.height * 50
            );
            wall.build();
            this.gameObjects.push(wall);
        }
    }

    async advanceStage(stage) {
        this.gameObjects = [];
        this.events = [];

        const size = 50;
        const currentStage = this.sceneState.currentStage;

        this.gameObjects.push(this.spaceship);
        currentStage.finish.x = stage.finish.x * size

        this.events.push(this.sceneState.currentStage.finish)
        for (let i = 0; i < stage.walls.length; i++) {
            const wall = stage.walls[i];
            console.log(wall.x)
            this.createWall(wall.x, wall.y, wall.width, wall.height)
        }

        this.sceneState.stage += 1
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
    async loop() {
        console.log("debug")
        // Raumschiff bewegen
        this.moveSpaceship();
        this.checkBoundaries();
        this.moveWall();
        this.moveAsteroids();
        this.moveEvents();

        // Gegner bewegen
        // this.moveEvents.bind(this);
        // this.moveAsteroids.bind(this);
        // Kollisionsprüfung
        this.checkCollisions();

        await this.nextLevel();
        // Spiel-Loop wiederholen
        if (!this.gameOver)
            requestAnimationFrame(this.loop.bind(this));
    }

    async nextLevel() {
        const BLOCK_WIDTH = 50
        if (this.events[0] !== undefined) {
            var finish = this.events[0]

            if (finish.x <= 0) {
                this.spaceship.x = 0
                this.sceneState.currentStage = await getStage(this.sceneState.stage + 1);
                await this.advanceStage();
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
        this.gameObjects.push(wall); // Gegner zum walls-Array hinzufügen
        super.build()
    }

    createRandomAsteroid() {
        const asteroidSize = Math.floor(Math.random() * 30) + 10;
        const asteroidSpeed = Math.random() * 10;

        const asteroidX = this.view.offsetWidth;
        const asteroidY = Math.floor(Math.random() * (this.view.offsetHeight - asteroidSize));

        let asteroid = new Asteroid(
            asteroidX,
            asteroidY,
            asteroidSize,
            -asteroidSpeed
        )
        asteroid.build();

        this.gameObjects.push(asteroid);
        super.build();
    }

    moveEvents() {
        for (var i = 0; i < this.events.length; i++) {
            const event = this.events[i];
            const newLeft = event.x;
            event.x = newLeft - 2;
        }
    }

    moveWall() {
        for (var i = 0; i < this.gameObjects.length; i++) {
            if (this.gameObjects[i] instanceof Wall) {
                const wall = this.gameObjects[i];
                const newLeft = wall.x;
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

    moveAsteroids() {
        this.gameObjects.forEach((gameObject) => {
            if (gameObject instanceof Asteroid) {
                let asteroid = gameObject;
                asteroid.x += asteroid.speed;

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
        for (var i = 0; i < this.gameObjects.length; i++) {
            var current = this.gameObjects[i];
            if (current instanceof Wall || current instanceof Asteroid) {
                var elementRect = current.element.getBoundingClientRect();
                if (this.spaceship.intersect(elementRect)) {
                    // Kollision zwischen Raumschiff und Gegner
                    console.log("boom")
                    // console.log(this.spaceship.x,this.spaceship.y,elementRect.x,elementRect.y)
                    endGame();
                    return;
                }
            }
        }
    }

    checkBoundaries() {
        const bounding_box = this.view.getBoundingClientRect();
        const spaceship = this.spaceship;

        if (this.spaceship.x <= 0) {
            this.spaceship.x = 0
        }

        if (spaceship.x >= bounding_box.width - spaceship.width) {
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
    async endGame() {
        // score in den local storage schreiben
        // und spaeter in der endGameScene wiederholen
        // und anzeigen
    }
}