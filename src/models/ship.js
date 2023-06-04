import GameObject from "./game_object.js";

export default class Ship extends GameObject {
  constructor(x, y, width, height){
    super(x, y, width, height)
  }

  build(document){
    this.element = document.createElement("div");
    // this.element.class = "spaceship"
    this.element.className = 'spaceship';
    this.element.style.position = 'absolute';
    this.element.style.top = '200px';
    this.element.style.left = '50px';
    this.element.style.width = '50px';
    this.element.style.height = '50px';

    return this.element;
  }

  draw(document){
    document.body.appendChild(this.element)
  }
}
