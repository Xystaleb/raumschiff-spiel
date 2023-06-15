import GameObject from './game-object.js'

export default class Ship extends GameObject {
  constructor (x, y, sidelength, name) {
    super(x, y, sidelength, sidelength)
    this.projectiles = []
    this.canShoot = true
    this.score = 0
    this.name = name
  }

  build1 () {
    this.element = document.createElement('div')
    this.element.className = 'spaceship1'
    super.build()
  }

  build2 () {
    this.element = document.createElement('div')
    this.element.className = 'spaceship2'
    super.build()
  }
}
