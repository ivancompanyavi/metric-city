import { Rect, Cube, Point, Dimension3D, Dimension2D } from '../base'

import Building from './building'

export default class Hospital extends Building {
  draw() {
    this._drawSecondBlock()
    this._drawFirstBlock()
  }

  _drawFirstBlock() {
    let tempPoint
    const { ctx, width, height, point: p } = this
    const point = new Point(this.point.x, this.point.y)
    const cube = new Cube({ ctx, width, height, point: p })
    const rect = new Rect({ ctx, width, height, point: p })
    // Walls
    tempPoint = cube.draw({
      ...new Dimension3D(5, 7, 5),
      color: this.getColor('#B9B5AC', true),
      point,
    })
    tempPoint = cube.draw({
      ...new Dimension3D(5, 1, 5),
      color: this.getColor('#81645E', true),
      point: tempPoint[2][0],
    })
    tempPoint = cube.draw({
      ...new Dimension3D(5, 1, 5),
      color: this.getColor('#FFFFFF'),
      point: tempPoint[2][0],
    })
    cube.draw({
      ...new Dimension3D(5, 4, 5),
      color: this.getColor('#81645E', true),
      point: tempPoint[2][0],
    })

    // Windows
    const windows = [
      new Point(1, 1),
      new Point(1, 4),
      new Point(3, 4),
      new Point(3, 1),
    ]
    windows.forEach(w => {
      rect.draw({
        ...new Dimension2D(1, 2),
        axis: 'x',
        color: this.getColor('#FFFFFF'),
        point,
        coords: w,
      })
      rect.draw({
        ...new Dimension2D(1, 2),
        axis: 'y',
        color: this.getColor('#FFFFFF'),
        point,
        coords: w,
      })
    })

    // Cross
    rect.draw({
      ...new Dimension2D(1, 3),
      axis: 'x',
      color: this.getColor('#FFFFFF'),
      point,
      coords: new Point(2, 10),
    })
    rect.draw({
      ...new Dimension2D(3, 1),
      axis: 'x',
      color: this.getColor('#FFFFFF'),
      point,
      coords: new Point(1, 11),
    })
    // Now we draw the cross
  }

  _drawSecondBlock() {
    let tempPoint
    const { ctx, width, height, point } = this
    const cube = new Cube({ ctx, width, height, point })
    const rect = new Rect({ ctx, width, height, point })
    const firstPoint = new Point(
      point.x + (7 * width) / 2,
      point.y - (3 * height) / 2,
    )
    // Walls
    tempPoint = cube.draw({
      ...new Dimension3D(9, 7, 7),
      color: this.getColor('#B9B5AC', true),
      point: firstPoint,
    })
    tempPoint = cube.draw({
      ...new Dimension3D(9, 1, 7),
      color: this.getColor('#81645E', true),
      point: tempPoint[2][0],
    })
    tempPoint = cube.draw({
      ...new Dimension3D(9, 1, 7),
      color: this.getColor('#FFFFFF'),
      point: tempPoint[2][0],
    })
    tempPoint = cube.draw({
      ...new Dimension3D(9, 4, 7),
      color: this.getColor('#81645E', true),
      point: tempPoint[2][0],
    })
    // Door
    rect.draw({
      ...new Dimension2D(3, 3),
      axis: 'x',
      color: this.getColor('blue'),
      point: firstPoint,
      coords: new Point(3, 0),
    })
    // Windows
    const windows = [
      new Point(1, 1),
      new Point(1, 4),
      new Point(3, 4),
      new Point(5, 4),
      new Point(7, 4),
      new Point(7, 1),
    ]
    windows.forEach(w => {
      rect.draw({
        ...new Dimension2D(1, 2),
        axis: 'x',
        color: this.getColor('#FFFFFF'),
        point: firstPoint,
        coords: w,
      })
    })
  }
}
