export default class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  compare(point) {
    if (this.x === point.x) {
      return this.y - point.y
    }
    return this.x - point.x
  }
}
