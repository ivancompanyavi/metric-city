import { Rect, Cube, Dimension3D, Dimension2D } from '../base'

import Building from './building'

export default class Police extends Building {
  draw() {
    this._drawBlock()
  }

  _drawBlock() {
    const { ctx, tile, point } = this
    const cube = new Cube({ ctx, tile, point })
    const rect = new Rect({ ctx, tile, point })
    // Walls
    let tempPoint = cube.draw({
      ...new Dimension3D(10, 5, 7),
      color: this.getColor('#D7DADB', true),
      point,
    })
    tempPoint = cube.draw({
      ...new Dimension3D(10, 1, 7),
      color: this.getColor('#5A90C6'),
      point: tempPoint[2][0],
    })
    cube.draw({
      ...new Dimension3D(10, 1, 7),
      color: this.getColor('#D7DADB'),
      point: tempPoint[2][0],
    })

    // Windows
    rect.draw({
      ...new Dimension2D(2, 3),
      axis: 'x',
      color: this.getColor('#7CA1D2'),
      point,
      coords: { x: 1, y: 1 },
    })
    rect.draw({
      ...new Dimension2D(2, 3),
      axis: 'x',
      color: this.getColor('#7CA1D2'),
      point,
      coords: { x: 7, y: 1 },
    })
    rect.draw({
      ...new Dimension2D(2, 3),
      axis: 'y',
      color: this.getColor('#7CA1D2'),
      point,
      coords: { x: 1, y: 1 },
    })
    rect.draw({
      w: 2,
      h: 3,
      axis: 'y',
      color: this.getColor('#7CA1D2'),
      point,
      coords: { x: 4, y: 1 },
    })

    // Door
    rect.draw({
      w: 2,
      h: 4,
      axis: 'x',
      color: this.getColor('#7CA1D2'),
      point,
      coords: { x: 4, y: 0 },
    })
  }
}
