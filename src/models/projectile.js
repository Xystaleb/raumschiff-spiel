import GameObject from './game-object.js'

export default class Projectile extends GameObject {
  constructor(x, y, width, height) {
    super(x, y, width, height)
  }

  // Erstellt das DOM-Element für das Projektil
  build() {
    this.element = document.createElement('div')
    this.element.className = 'projectile'
    super.build()
  }
}
