import GameObject from "./game_object.js";

export default class GameEvent extends GameObject {
  constructor(x, y, width, height, funktion){
    super(x, y, width, height)
    this.funktion = funktion
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