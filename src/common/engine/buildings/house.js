import { Cube, Point, Dimension3D } from '../base'
import Building from './building'

const DEFAULT_COLOR = '#cb4154'
const TRANSPARENCY = '66'

export default class House extends Building {
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
    let invisibleStartingPoint = this.point
    if (pct === 0.0) {
      this._drawFundation(data)
    } else {
      if (pct > 0.0) {
        invisibleStartingPoint = this._drawVisiblePart(data)[0][1]
      }
      if (pct < 1.0) {
        this._drawInvisiblePart(data, invisibleStartingPoint)
      }
    }
  }

  _drawFundation(data) {
    const { w, h } = data
    const { ctx, width, height, point } = this
    const cube = new Cube({ ctx, width, height, point })
    return cube.draw({
      ...new Dimension3D(w, 0, h),
      color: this.getColor(`${DEFAULT_COLOR}`),
      point,
    })
  }

  _drawVisiblePart(data) {
    const { pct, w, h, t, color } = data
    const { ctx, width, height, point: p } = this
    const point = new Point(this.point.x, this.point.y)
    const cube = new Cube({ ctx, width, height, point: p })
    // Walls
    return cube.draw({
      ...new Dimension3D(w, Math.floor(pct * t), h),
      color: color,
      point,
    })
  }

  _drawInvisiblePart(data, startingPoint) {
    const { pct, w, h, t, color } = data
    const { ctx, width, height, point: p } = this
    const cube = new Cube({ ctx, width, height, point: p })
    // Walls
    cube.draw({
      ...new Dimension3D(w, t - Math.floor(t * pct), h),
      color: this.getColor(`${color}${TRANSPARENCY}`),
      point: startingPoint,
    })
  }
}
