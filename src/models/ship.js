import GameObject from "./game_object.js";

export default class Ship extends GameObject {
  constructor(x, y, ratio){
    const width = 26;
    const height = 26;
    super(x, y, width*ratio, height*ratio)
    this.projectiles = [];
  }

  build(){
    this.element = document.createElement("div");
    this.element.className = 'spaceship';
    super.build();
  }
}
