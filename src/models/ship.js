import GameObject from "./game_object.js";

export default class Ship extends GameObject {
  constructor(x, y, width, height){
    super(x, y, width, height)
  }

  build(){
    this.element = document.createElement("div");
    this.element.className = 'spaceship';
    this.element.style.position = 'absolute';
    this.element.style.top = this.y+'px';
    this.element.style.left = this.x+'px';
    this.element.style.width = this.width+'px' ;
    this.element.style.height = this.height+'px';

    return this.element;
  }

  draw(document){
    document.appendChild(this.element)
  }
}
