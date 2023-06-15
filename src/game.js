import Ship from "./models/ship.js";
import Enemy from "./models/enemy.js";
import Asteroid from "./models/asteroid.js";
import Wall from "./models/wall.js";
import GameScene from "./scene/game-scene.js";
import MenuScene from "./scene/menu-scene.js";
import EndGameScene from "./scene/end-game-scene.js";

  let CAMERA = document.getElementById('camera');
function setCameraSize() {

  const width = window.innerWidth;
  const height = window.innerHeight;
  CAMERA.style.width = width + 'px';
  CAMERA.style.height = height + 'px';
}

// Rufe die Funktion beim Laden der Seite und beim Ändern der Fenstergröße auf
window.addEventListener('DOMContentLoaded', setCameraSize);
window.addEventListener('resize', setCameraSize);

function startScreen(){
  var menuScene = new MenuScene(CAMERA);
  menuScene.build();
  menuScene.draw();
}

startScreen();