export default class Scene {
    constructor(view){
        this.width = view.width;
        this.height = view.height;

        this.view = view;
        this.keys = [];

        this.events = [];
        this.gameObjects = [];
        this.components = [];
        this.projectiles = [];
        this.sceneState = {};
    }

    build(){
        // Remove elements from end
        while(this.view.lastChild){
            this.view.removeChild(this.view.lastChild);
        }

        // add gameObjects
        for(const gameObject of this.gameObjects){
            this.view.append(gameObject.element);
        }

        // add components
        for(const component of this.components){
            this.view.append(component);
        }

        for(const projectile of this.projectiles){
            this.view.append(projectile.element)
        }
    }

    draw(){
        requestAnimationFrame(this.loop.bind(this));
    }

    loop(){
        // check collisions
        // check game end
        // ...
    }
}