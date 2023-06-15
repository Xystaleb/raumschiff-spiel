import GameObject from './game_object.js'

export default class Projectile extends GameObject {
  constructor (x, y, width, height) {
    super(x, y, width, height)
  }

  build (document) {
    this.element = document.createElement('div')
    this.element.className = 'enemy'
    this.element.style.position = 'absolute'
    this.element.style.top = this.y + 'px'
    this.element.style.left = this.x + 'px'
    this.element.style.width = this.width + 'px'
    this.element.style.height = this.height + 'px'

    return this.element
  }

  draw (document) {
    document.body.appendChild(this.element)
  }
}
