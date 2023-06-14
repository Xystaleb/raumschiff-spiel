import Ship from "./models/ship.js";
import Enemy from "./models/enemy.js";
import Asteroid from "./models/asteroid.js";
import Wall from "./models/wall.js";
import GameScene from "./scene/game-scene.js";
import MenuScene from "./scene/menu-scene.js";
import EndGameScene from "./scene/end-game-scene.js";


const CAMERA = document.getElementById("camera");

function startScreen(){
  var menuScene = new MenuScene(CAMERA);
  menuScene.build();
  menuScene.draw();
}

startScreen();