export default class Scene {
    constructor(view){
        this.width = view.width;
        this.height = view.height;

        this.view = view;
        this.keys = [];

        this.events = [];
        this.gameObjects = [];
        this.components = [];
    }

    build(){
        // Remove elements from end
        while(this.view.lastChild){
            this.view.removeChild(this.view.lastChild);
        }

        // add gameObjects
        for(let gameObject of this.gameObjects){
            this.view.append(gameObject.element);
        }

        // add components
        for(let component of this.components){
            this.view.append(component);
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