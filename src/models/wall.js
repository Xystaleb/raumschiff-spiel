import GameObject from './game-object.js'

export default class Wall extends GameObject {
  constructor(x, y, width, height) {
    super(x, y, width, height)
  }

  // Erstellt das DOM-Element für die Wände
  build() {
    this.element = document.createElement('div')
    this.element.className = 'wall'
    super.build()
  }
}
