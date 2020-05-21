import { Cube, Point, Dimension3D } from '../base/index.js'
import Building from './building.js'

const DEFAULT_COLOR = '#cb4154'
const TRANSPARENCY = '66'

export default class StackedHouse extends Building {
  drawHitGraph(data) {
    const { w, t, h, pct, color } = data
    const { ctx, width, height, point } = this
    const tall = pct === 0.0 ? 0 : t
    const cube = new Cube({ ctx, width, height, point })
    return cube.draw({
      ...new Dimension3D(w, tall, h),
      color,
      point,
      strokeColor: color,
    })
  }

  draw(data) {
    const { pct } = data
    const floors = Math.floor(pct * 10)
    for (let i = 0; i < floors; i++) {
      this._drawFloor(data, i)
    }
  }

  _drawFloor(data, i) {
    const { ctx, width, height, point } = this
    const cube = new Cube({
      ctx,
      width,
      height,
      point: { x: point.x, y: point.y - height * i },
    })
    return cube.draw({
      w: 4,
      h: 1,
      d: 4,
      color: 'red',
    })
  }

  _drawFundation(data) {
    const w = 4
    const h = 4
    const { ctx, width, height, point } = this
    const cube = new Cube({ ctx, width, height, point })
    return cube.draw({
      ...new Dimension3D(w, 0, h),
      color: this.getColor(`${DEFAULT_COLOR}`),
      point,
    })
  }
}
