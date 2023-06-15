import Asteroid from "../models/asteroid.js";
import Ship from "../models/ship.js";
import Wall from "../models/wall.js";
import Scene from "./scene.js";
import Projectile from "../models/projectile.js";
import { getStage } from "../level-helper.js";
import EndGameScene from "./end-game-scene.js";

export default class GameScene extends Scene {
    constructor(view, boolean) {
        super(view);
        this.singlePlayer = boolean; // boolean zum übergeben ob multiplayer, oder singleplayer
        this.ratio = view.offsetWidth / view.offsetHeight;
        this.sceneState = {
            stage: 1,
            currentStage: undefined,
            gameOver: false,
            finish: undefined
        };
    }

    getSceneState() {
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

        console.log(this.singlePlayer)

        // register eventhandlers
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        document.addEventListener("keyup", this.handleKeyUp.bind(this));

        const BLOCK_WIDTH = 50;
        const BLOCK_HEIGHT = 50;

        this.playerOneShip = new Ship(
            BLOCK_WIDTH,
            8 * BLOCK_HEIGHT,
            this.ratio
        );
        this.playerOneShip.build1();
        this.gameObjects.push(this.playerOneShip);

        if (!this.singlePlayer) {
            this.playerTwoShip = new Ship(
                BLOCK_WIDTH,
                8 * BLOCK_HEIGHT,
                this.ratio
            );

            this.playerTwoShip.build2();
            this.gameObjects.push(this.playerTwoShip);
        }

        await this.initStage();
        super.build();
    }

    // 1 level laden
    async initStage() {
        this.sceneState.stage = 0;
        this.sceneState.currentStage = await getStage(1);
        await this.initializeStage();
    }

    // Level erzeugen
    async initializeStage() {
        const BLOCK_WIDTH = 50;

        const stage = this.sceneState.currentStage;
        this.finish = stage.finish * BLOCK_WIDTH;

        for (const wall of stage.walls) {
            this.createWall(wall.x, wall.y, wall.width, wall.height);
        }

        if (stage.asteroids) {
            for (const asteroid of stage.asteroids) {
                this.createAsteroid(asteroid.x, asteroid.y, asteroid.size, asteroid.speed);
            }
        }

        if (stage.randomSize !== undefined) {
            for (const rnd of stage.randomSize) {
                let size = Math.random() * (BLOCK_WIDTH - 20) + 20
                this.createAsteroid(rnd.x, rnd.y, size, rnd.speed);
            }
        }

        if (stage.asteroidSpawner !== undefined) {
            for (const spawner of stage.asteroidSpawner) {
                spawner.x *= BLOCK_WIDTH;
                this.events.push(spawner);
            }
        }

        this.sceneState.stage += 1;
    }

    // game loop
    async loop() {
        // Raumschiff bewegen
        this.moveSpaceship();
        // Boundaries, damit die Schiffe nicht aus dem spielfeld fliegen (zweiter aufruf falls es einen zweiten spieler gibt)
        this.checkBoundaries(this.playerOneShip);
        if(!this.singlePlayer){
            this.checkBoundaries(this.playerTwoShip); 
        }
        // Wände/Level bewegen
        this.moveWall();
        // Asteroiden bewegen
        this.moveAsteroids();
        // Eventmarker bewegen
        this.moveEvents();
        // entfernen von Projektilen (zweiter aufruf falls es einen zweiten spieler gibt)
        this.updateProjectiles(this.playerOneShip);
        if (!this.singlePlayer) {
            this.updateProjectiles(this.playerTwoShip);
        }
        // Überprüfen von Projektilkollision (zweiter aufruf falls es einen zweiten spieler gibt)
        this.checkProjectileCollision(this.playerOneShip);
        if (!this.singlePlayer) {
            this.checkProjectileCollision(this.playerTwoShip);
        }
        //next level Marker bewegen
        this.moveFinish();
        // Überprüfen von gegnerKollision mit dem Schiff (zweiter aufruf falls es einen zweiten spieler gibt)
        this.checkCollisions(this.playerOneShip);
        if (!this.singlePlayer) {
            this.checkCollisions(this.playerTwoShip);
        }
        // events auslösen (zur Zeit nur Asteroiden Spawner)
        this.checkEvents();
        //nächstes Level laden
        if (this.finish <= 0)
            await this.nextLevel();
        // Spiel-Loop wiederholen
        if (!this.sceneState.gameOver)
            requestAnimationFrame(this.loop.bind(this));
    }

    checkEvents() {
        if (this.events === undefined)
            return;
        for (let i = 1; i < this.events.length; i++) {
            const element = this.events[i];
            if (element.type == "spawner")
                if (element.x <= 0) {
                    this.startAsteroidSpawner();
                    this.events.splice(i, 1);
                    return;
                }
        }
    }

    async nextLevel() {
        this.playerOneShip.x = 0
        if (!this.singlePlayer) {
            this.playerTwoShip.x = 0
        }

        if(this.sceneState.stage === 5) {
            this.endGame();
        }

        this.sceneState.currentStage = await getStage(this.sceneState.stage + 1);
        await this.initializeStage()
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
        this.registerGameObject(wall);
    }

    createAsteroid(x, y, size, speed) {
        const BLOCK_WIDTH = 50;
        const BLOCK_HEIGHT = 50;
        let asteroid = new Asteroid(
            x * BLOCK_WIDTH,
            y * BLOCK_HEIGHT,
            size,
            speed
        )
        asteroid.build();
        this.registerGameObject(asteroid);
    }

    createRandomAsteroid() {
        const asteroidSize = Math.floor(Math.random() * 30) + 30;
        const asteroidSpeed = Math.random()*3;

        const asteroidX = this.view.offsetWidth;
        const asteroidY = Math.floor(Math.random() * (this.view.offsetHeight - asteroidSize));

        let asteroid = new Asteroid(
            asteroidX,
            asteroidY,
            asteroidSize,
            asteroidSpeed
        )
        asteroid.build();
        this.registerGameObject(asteroid);
    }

    createProjectile(player) {
        if (player.canShoot == false)
            return;

        const projectile = new Projectile(
            player.x + player.width,
            player.y + player.height / 2,
            10,
            4
        );
        projectile.build();
        this.registerProjectile(projectile);
        player.projectiles.push(projectile);
        player.canShoot = false;

        // Verzögerung für den nächsten Schuss
        setTimeout(() => {
            player.canShoot = true;
        }, 300); // 300 Millisekunden Verzögerung
    }

    updateProjectiles(player) {
        const projectilesToDelete = []

        // überprüfen der player projectiles
        player.projectiles.forEach((projectile, idx) => {
            if (projectile.x <= this.view.offsetWidth) {
                projectile.x += 5;
            } else {
                projectilesToDelete.push(idx);
            }
            projectile.update();
        });

        for (const idx of projectilesToDelete) {
            player.projectiles[idx].element.remove();
            player.projectiles.splice(idx, 1);
            break;
        }
    }

    // Eventmarker bewegen
    moveEvents() {
        for (var i = 0; i < this.events.length; i++) {
            const event = this.events[i];
            const newLeft = event.x;
            event.x = newLeft - 2;
        }
    }

    //next level Marker bewegen
    moveFinish() {
        this.finish -= 2
    }

    // Wände bewegen
    moveWall() {
        const wallsToDelete = []
        this.gameObjects.forEach((gameObject, idx) => {
            if (gameObject instanceof Wall) {
                let wall = gameObject;
                wall.x -= 2;

                if (wall.x + wall.width < 0) {
                    // Wand hat das Spielfeld verlassen, daher entfernen
                    wallsToDelete.push(idx)

                } else {
                    // Aktualisiere die Position der Wand im DOM
                    wall.update();
                }
            }
        });

        for (const idx of wallsToDelete) {
            this.gameObjects[idx].element.remove();
            this.gameObjects.splice(idx, 1)
            break; //das löschen, des objektes aus dem array beeinflusst das array, so dass es bei erneutem ausführen zu fehlern führt. daher ein break. beim nächsten loop wird dann das nächste Element gelöscht.
        }
    }

    moveAsteroids() {
        const asteroidsToDelete = [];
        this.gameObjects.forEach((gameObject, idx) => {
            if (gameObject instanceof Asteroid) {
                let asteroid = gameObject;
                asteroid.x -= asteroid.speed;   //ÄNDERUNG von astroid.speed

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
        for (const idx of asteroidsToDelete) {
            this.gameObjects[idx].element.remove();
            this.gameObjects.splice(idx, 1)
            break;
        }
    }

    startAsteroidSpawner() {
        this.asteroidSpawner = setInterval(() => {
            this.createRandomAsteroid();
        }, 500);
    }

    // Funktion zur Kollisionsprüfung
    checkCollisions(player) {
        for (var i = 0; i < this.gameObjects.length; i++) {
            var current = this.gameObjects[i];
            if (current instanceof Wall || current instanceof Asteroid) {
                var elementRect = current.element.getBoundingClientRect();
                if (player.intersect(elementRect)) {
                    // Kollision zwischen Raumschiff und Gegner
                    console.log("boom")
                    console.log(player.x, player.y, elementRect.x, elementRect.y)
                    this.endGame();
                }
            }
        }
    }

    // Destroy astroids with projectiles due to collision
    checkProjectileCollision(player) {
        const projectilesToDelete = [];
        const asteroidsToDelete = [];

        player.projectiles.forEach((projectile, projectileIdx) => {
            this.gameObjects.forEach((gameObject, asteroidIdx) => {
                if (gameObject instanceof Asteroid) {
                    const projectileRect = projectile.element.getBoundingClientRect();

                    if (gameObject.intersect(projectileRect)) {
                        projectilesToDelete.push(projectileIdx);
                        asteroidsToDelete.push(asteroidIdx);
                        player.highscore += 1;
                        console.log(player.highscore)
                        return;
                    }
                }

                if (gameObject instanceof Wall) {
                    const projectileRect = projectile.element.getBoundingClientRect();

                    if (gameObject.intersect(projectileRect)) {
                        projectilesToDelete.push(projectileIdx);
                        return;
                    }
                }
            });
        });

        for (const idx of projectilesToDelete) {
            player.projectiles[idx].element.remove();
            player.projectiles.splice(idx, 1);
            break;
        }

        for (const idx of asteroidsToDelete) {
            this.gameObjects[idx].element.remove();
            this.gameObjects.splice(idx, 1);
            break;
        }
    }

    // Boundaries, damit die Schiffe nicht aus dem spielfeld fliegen
    checkBoundaries(ship) {
        const bounding_box = this.view.getBoundingClientRect();

        //prüfen ob das schiff links herrausfliegt
        if (this.playerOneShip.x <= 0) {
            this.playerOneShip.x = 0
        }

        //prüfen ob das schiff rechts herrausfliegt
        if (ship.x >= bounding_box.width - ship.width) {
            ship.x = bounding_box.width - ship.width;
        }

        //prüfen ob das schiff oben herrausfliegt
        if (ship.y <= 0) {
            ship.y = 0
        }

        //prüfen ob das schiff unten herrausfliegt
        if (ship.y >= bounding_box.height - ship.height) {
            ship.y = bounding_box.height - ship.height;
        }
    }

    // Raumschiff bewegen
    moveSpaceship() {
        const spaceshipSpeed = 5;

        if (this.keys['w']) {
            // Bewegungslogik für nach oben
            this.playerOneShip.y -= spaceshipSpeed;
        }
        if (this.keys['s']) {
            // Bewegungslogik für nach unten
            this.playerOneShip.y += spaceshipSpeed;
        }

        if (this.keys['a']) {
            // Bewegungslogik für nach links
            this.playerOneShip.x -= spaceshipSpeed;
        }
        if (this.keys['d']) {
            // Bewegungslogik für nach rechts
            this.playerOneShip.x += spaceshipSpeed;
        }
        if (this.keys[' '] && this.playerOneShip.canShoot) {
            // Schießen eines Projektils
            this.createProjectile(this.playerOneShip);
        }
        this.playerOneShip.update();

        if (!this.singlePlayer) {
            if (this.keys['ArrowUp']) {
                // Bewegungslogik für nach oben
                this.playerTwoShip.y -= spaceshipSpeed;
            }
            if (this.keys['ArrowDown']) {
                // Bewegungslogik für nach unten
                this.playerTwoShip.y += spaceshipSpeed;
            }

            if (this.keys['ArrowLeft']) {
                // Bewegungslogik für nach links
                this.playerTwoShip.x -= spaceshipSpeed;
            }
            if (this.keys['ArrowRight']) {
                // Bewegungslogik für nach rechts
                this.playerTwoShip.x += spaceshipSpeed;
            }
            if (this.keys['Enter'] && this.playerTwoShip.canShoot) {
                // Schießen eines Projektils
                this.createProjectile(this.playerTwoShip);
            }
            this.playerTwoShip.update();
        }
    }

    endGame() {
        this.sceneState.gameOver = !this.sceneState.gameOver
        const playerOne = this.playerOneShip;
        let playerTwo;
        if (this.singlePlayer) {
            playerTwo = new Ship(
                50,
                8 * 50,
                this.ratio
            )
        } else {
            playerTwo = this.playerTwoShip
        }

        var endGame = new EndGameScene(this.view, playerOne, playerTwo, this.singlePlayer); // Übergabe ob single oder multiplayer
        endGame.build();
        endGame.draw();
    }
}