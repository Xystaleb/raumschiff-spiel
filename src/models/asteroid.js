import GameObject from "./game-object.js";

export default class Asteroid extends GameObject {
    constructor(x, y, size, speed) {
        super(x, y, size, size);
        this.speed = speed;
    }

    build() {
        this.element = document.createElement('div');
        this.element.className = 'asteroid';
        this.element.style.borderRadius = "50%";
        super.build();
    }
}