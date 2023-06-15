import GameObject from './game-object.js'

export default class Ship extends GameObject {
  constructor(x, y, sidelength, name) {
    super(x, y, sidelength * 2, sidelength)
    this.projectiles = []
    this.canShoot = true
    this.score = 0
    this.name = name
  }

  // Erstellt das DOM-Element für das Raumschiff 1
  build1() {
    this.element = document.createElement('div')
    this.element.className = 'spaceship1'
    super.build()
  }

  // Erstellt das DOM-Element für das Raumschiff 2
  build2() {
    this.element = document.createElement('div')
    this.element.className = 'spaceship2'
    super.build()
  }
}
