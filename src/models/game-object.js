export default class GameObject {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.element = null
  }

  // Setzt die Position, Größe und Lage eines HTML-Elements mithilfe von CSS-Stilen.
  build() {
    this.element.style.position = 'absolute'
    this.element.style.top = this.y + 'px'
    this.element.style.left = this.x + 'px'
    this.element.style.width = this.width + 'px'
    this.element.style.height = this.height + 'px'
  }

  // Aktualisiert die Position eines Elements auf der Webseite basierend auf seinen x- und y-Koordinaten.
  update() {
    this.element.style.top = this.y + 'px'
    this.element.style.left = this.x + 'px'
  }

  // Überprüft, ob sich zwei Rechtecke miteinander schneiden.
  intersect(r2) {
    const bounding_box = this.element.getBoundingClientRect()
    return (
        bounding_box.left < r2.right &&
        bounding_box.right > r2.left &&
        bounding_box.top < r2.bottom &&
        bounding_box.bottom > r2.top
    )
  }
}
