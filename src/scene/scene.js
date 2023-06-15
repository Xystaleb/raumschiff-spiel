export default class Scene {
  constructor(view, config) {
    this.width = view.width;
    this.height = view.height;

    this.view = view;
    this.keys = [];

    this.events = [];
    this.gameObjects = [];
    this.components = [];
    this.projectiles = [];
    this.sceneState = {};
    this.config = config;
  }

  build() {
    // Entfernt Elemente am Ende
    while (this.view.lastChild) {
      this.view.removeChild(this.view.lastChild);
    }

    // Fügt Game-Objekte hinzu
    for (const gameObject of this.gameObjects) {
      this.view.append(gameObject.element);
    }

    // Fügt Komponenten hinzu
    for (const component of this.components) {
      this.view.append(component);
    }
  }

  draw() {
    requestAnimationFrame(this.loop.bind(this));
  }

  registerComponent(component) {
    this.components.push(component);
    this.view.append(component);
  }

  registerGameObject(gameObject) {
    this.gameObjects.push(gameObject);
    this.view.append(gameObject.element);
  }

  registerProjectile(projectile) {
    this.view.append(projectile.element);
  }

  loop() {
    // Überprüft Kollisionen
    // Überprüft Spielende
    // ...
  }
}
