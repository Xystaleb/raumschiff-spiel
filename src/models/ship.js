import GameObject from "./game-object.js";

export default class Ship extends GameObject {
  constructor(x, y, ratio){
    const width = 26;
    const height = 26;
    super(x, y, width*ratio, height*ratio)
    this.projectiles = [];
    this.canShoot = true;
    this.highscore = 0;
  }

  build1(){
    this.element = document.createElement("div");
    this.element.className = 'spaceship1';
    super.build();
  }

  build2(){
    this.element = document.createElement("div");
    this.element.className = 'spaceship2';
    super.build();
  }

}
