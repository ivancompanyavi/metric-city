import { Rect, Cube, Dimension3D, Dimension2D } from '../base/index.js'

import Building from './building.js'

export default class Police extends Building {
  drawHitGraph(data) {
    this.draw({ ...data, strokeColor: data.color })
  }
  draw(data) {
    this._drawBlock(data)
  }

  _drawBlock({ color, strokeColor }) {
    const { ctx, tile, point } = this
    const cube = new Cube({ ctx, tile, point })
    const rect = new Rect({ ctx, tile, point })
    // Walls
    let tempPoint = cube.draw({
      ...new Dimension3D(10, 5, 7),
      color: this.getColor(color || '#D7DADB', true),
      strokeColor,
      point,
    })
    tempPoint = cube.draw({
      ...new Dimension3D(10, 1, 7),
      color: this.getColor(color || '#5A90C6'),
      strokeColor,
      point: tempPoint[2][0],
    })
    cube.draw({
      ...new Dimension3D(10, 1, 7),
      color: this.getColor(color || '#D7DADB'),
      strokeColor,
      point: tempPoint[2][0],
    })

    // Windows
    rect.draw({
      ...new Dimension2D(2, 3),
      axis: 'x',
      color: this.getColor(color || '#7CA1D2'),
      strokeColor,
      point,
      coords: { x: 1, y: 1 },
    })
    rect.draw({
      ...new Dimension2D(2, 3),
      axis: 'x',
      color: this.getColor(color || '#7CA1D2'),
      strokeColor,
      point,
      coords: { x: 7, y: 1 },
    })
    rect.draw({
      ...new Dimension2D(2, 3),
      axis: 'y',
      color: this.getColor(color || '#7CA1D2'),
      strokeColor,
      point,
      coords: { x: 1, y: 1 },
    })
    rect.draw({
      w: 2,
      h: 3,
      axis: 'y',
      color: this.getColor(color || '#7CA1D2'),
      strokeColor,
      point,
      coords: { x: 4, y: 1 },
    })

    // Door
    rect.draw({
      w: 2,
      h: 4,
      axis: 'x',
      color: this.getColor(color || '#7CA1D2'),
      strokeColor,
      point,
      coords: { x: 4, y: 0 },
    })
  }
}
