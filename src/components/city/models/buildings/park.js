import { Cube, Point, Dimension3D } from '../base/index.js'
import Building from './building.js'

const COLOR = '#7cfc00'

export default class Park extends Building {
  drawHitGraph(data) {
    this.draw({ ...data, strokeColor: data.color })
  }
  draw(data) {
    this._drawFloor(data)
  }

  _drawFloor({ w, h, color = COLOR, strokeColor }) {
    const { ctx, width, height, point: p } = this
    const point = new Point(p.x, p.y)
    const cube = new Cube({ ctx, width, height, point: p })
    // Walls
    return cube.draw({
      ...new Dimension3D(w, 0, h),
      color: this.getColor(`${color}`, true),
      strokeColor,
      point,
    })
  }
}
