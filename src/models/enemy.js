import GameObject from "./game_object.js";

export default class Enemy extends GameObject {
    constructor(x, y, width, height,) {
        super(x, y, width, height);
    }

    build(document) {
        this.element = document.createElement('div');
        this.element.className = 'enemy';
        this.element.style.position = 'absolute';
        this.element.style.top = enemy.y + 'px';
        this.element.style.left = enemy.x + 'px';
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
    }

    draw(document) {
        document.body.appendChild(this.element);
    }
}