import Shape from './shape.js'
import Point from './point.js'

const STROKE_COLOR = '#333333'

export default class Rect extends Shape {
  draw({
    w,
    h,
    axis = 'x',
    color = 'black',
    point = this.point,
    coords = null,
    strokeColor = STROKE_COLOR,
  }) {
    const { x, y } = point

    let points = []
    const { width, height } = this
    if (axis === 'x') {
      points[0] = new Point(x, y)
      points[1] = new Point(x, y - height * h)
      points[2] = new Point(
        x + (width * w) / 2,
        y - height * h - (height * w) / 2,
      )
      points[3] = new Point(x + (width * w) / 2, y - (height * w) / 2)
      if (coords) {
        points = points.map(
          p =>
            new Point(
              p.x + (coords.x * width) / 2,
              p.y - (coords.x * height) / 2 - coords.y * height,
            ),
        )
      }
    } else if (axis === 'y') {
      points[0] = new Point(x, y)
      points[1] = new Point(x, y - height * h)
      points[2] = new Point(
        x - (width * w) / 2,
        y - height * h - (height * w) / 2,
      )
      points[3] = new Point(x - (width * w) / 2, y - (height * w) / 2)

      if (coords) {
        points = points.map(
          p =>
            new Point(
              p.x - (coords.x * width) / 2,
              p.y - (coords.x * height) / 2 - coords.y * height,
            ),
        )
      }
    } else {
      points[0] = new Point(x, y)
      points[1] = new Point(x - (width * w) / 2, y - (height * w) / 2)
      points[2] = new Point(
        x - (width * w) / 2 + (width * h) / 2,
        y - (height * h) / 2 - (height * w) / 2,
      )
      points[3] = new Point(x + (width * h) / 2, y - (height * h) / 2)
      if (coords) {
        points = points.map(
          p =>
            new Point(
              p.x + (coords.x * width) / 2 + (coords.y * width) / 2,
              p.y - (coords.x * height) / 2 + (coords.y * height) / 2,
            ),
        )
      }
    }

    this.ctx.beginPath()
    this.ctx.moveTo(points[0].x, points[0].y)
    this.ctx.lineTo(points[1].x, points[1].y)
    this.ctx.lineTo(points[2].x, points[2].y)
    this.ctx.lineTo(points[3].x, points[3].y)

    this.ctx.fillStyle = color
    this.ctx.strokeStyle = strokeColor
    this.ctx.stroke()
    this.ctx.fill()
    return points
  }
}
