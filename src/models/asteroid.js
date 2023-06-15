import GameObject from './game-object.js'

export default class Asteroid extends GameObject {
  constructor(x, y, size, speed) {
    super(x, y, size, size)
    this.speed = speed
  }

  // Erstellt das DOM-Element für den Asteroiden
  build() {
    this.element = document.createElement('div')
    const randomColor = Math.floor(Math.random() * 16777214).toString(16)
    this.element.style.backgroundColor = '#' + randomColor
    console.log(this.element.style.backgroundColor)
    if (this.element.style.backgroundColor === "") {
      this.element.style.backgroundColor = "red"
    }
    this.element.style.borderRadius = '50%'
    super.build()
  }
}
