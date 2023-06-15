export default class GameObject {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.element = null;
  }

  /**
   * The function sets the position, size, and location of an HTML element using CSS styles.
   */
  build() {
    this.element.style.position = 'absolute';
    this.element.style.top = this.y + 'px';
    this.element.style.left = this.x + 'px';
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';
  }

  /**
   * The "update" function updates the position of an element on the webpage based on its x and y
   * coordinates.
   */
  update(){
    this.element.style.top = this.y + 'px';
    this.element.style.left = this.x + 'px';
  }

  /**
   * This function checks if two rectangles intersect with each other.
   * @param r2 - The parameter `r2` is likely an object representing a rectangle with properties `left`,
   * `right`, `top`, and `bottom`. This function is checking if the bounding box of `this.element` (which
   * is likely an HTML element) intersects with the rectangle represented by `r2`.
   * @returns The `intersect` method is returning a boolean value indicating whether the bounding box of
   * `this.element` intersects with the bounding box of the input parameter `r2`.
   */
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
