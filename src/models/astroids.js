import GameObject from "./game_object.js";

export default class Asteroid extends GameObject {
    constructor(x, y, width, height, speed) {
        super(x, y, width, height);
        this.speed = speed;
    }

    build() {
        this.element = document.createElement('div');
        this.element.className = 'asteroid';
        this.element.style.borderRadius = "50%";
        super.build();
    }
}