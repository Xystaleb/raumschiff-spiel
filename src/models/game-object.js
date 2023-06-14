export default class GameObject {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.element = null;
  }

  build() {
    this.element.style.position = 'absolute';
    this.element.style.top = this.y + 'px';
    this.element.style.left = this.x + 'px';
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';
  }

  update(){
    this.element.style.top = this.y + 'px';
    this.element.style.left = this.x + 'px';
  }

  intersect(r2) {
    const bounding_box = this.element.getBoundingClientRect();
    return (
      bounding_box.left < r2.right &&
      bounding_box.right > r2.left &&
      bounding_box.top < r2.bottom &&
      bounding_box.bottom > r2.top
    );
  }
}
