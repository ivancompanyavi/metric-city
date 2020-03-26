import Shape from './shape'
import Rect from './rect'
import { Dimension2D } from './dimension'

export default class Cube extends Shape {
  draw({ w, h, d, color = '#000000', point = this.point }) {
    const { ctx, width, height } = this
    const rect = new Rect({ ctx, width, height, point })
    const side1 = rect.draw({
      ...new Dimension2D(w, h),
      axis: 'x',
      color: this.getColor(color),
    })
    const side2 = rect.draw({
      ...new Dimension2D(d, h),
      axis: 'y',
      color: this.getColor(color),
    })
    // Modify the point to render for the topside rect
    rect.point = {
      x: rect.point.x,
      y: rect.point.y - h * height,
    }
    const side3 = rect.draw({
      ...new Dimension2D(d, w),
      axis: 'z',
      color: this.getColor(color),
    })
    return [side1, side2, side3]
  }
}
