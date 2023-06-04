export default class Enemy {
    constructor(width, height, game_width, game_height) {
        super(x, y, width, height);
    }

    build(document) {
        this.element = document.createElement('div');
        this.element.className = 'enemy';
        this.element.style.position = 'absolute';
        this.element.style.top = enemy.y + 'px';
        this.element.style.left = enemy.x + 'px';
        this.element.style.width = enemyWidth + 'px';
        this.element.style.height = enemyHeight + 'px';
    }

    draw(document) {
        document.body.appendChild(this.element);
    }
}