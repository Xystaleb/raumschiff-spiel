import MenuScene from './scene/menu-scene.js';

const CAMERA = document.getElementById('camera');

function setCameraSize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  CAMERA.style.width = width + 'px';
  CAMERA.style.height = height + 'px';
}

// Ruft die Funktion beim Laden der Seite und beim Ändern der Fenstergröße auf
window.addEventListener('DOMContentLoaded', setCameraSize);
window.addEventListener('resize', setCameraSize);

function startScreen() {
  const menuScene = new MenuScene(CAMERA);
  menuScene.build();
  menuScene.draw();
}

startScreen();
