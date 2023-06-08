import GameObject from "./game_object.js";

export default class Projectile extends GameObject {
    constructor(x, y, width, height) {
        super(x, y, width, height);

    }

    build() {
        this.element = document.createElement('div');
        this.element.className = 'projectile';

        super.build();
    }
}