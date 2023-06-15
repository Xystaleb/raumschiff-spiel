import MenuScene from "./scene/menu-scene.js";

  const CAMERA = document.getElementById('camera');
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