import { Cube, Point, Dimension3D } from '../base'
import Building from './building'

const COLOR = '#7cfc00'

export default class Park extends Building {
  draw({ w, h }) {
    this._drawFloor(w, h)
  }

  _drawFloor(w, h) {
    const { ctx, width, height, point: p } = this
    const point = new Point(p.x, p.y)
    const cube = new Cube({ ctx, width, height, point: p })
    // Walls
    return cube.draw({
      ...new Dimension3D(w, 0, h),
      color: this.getColor(`${COLOR}`, true),
      point,
    })
  }
}
