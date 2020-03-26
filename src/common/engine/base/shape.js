const TRANSPARENT_HEX_COLOR = '66'

export const STATES = {
  DEFAULT: 'DEFAULT',
  DRAGGING: 'DRAGGING',
}

export default class Shape {
  constructor({ ctx, width, height, point }) {
    this.ctx = ctx
    this.width = width
    this.height = height
    this.point = point
  }
  draw() {}

  drawHitGraph() {}

  getColor(color = this.color) {
    return color
  }
}
