import Building from './building'
import Rect from '../base/rect'
import Cube from '../base/cube'

export default class FireStation extends Building {
  draw() {
    this._drawFirstBlock()
  }

  _drawFirstBlock() {
    const { ctx, width, height, point } = this

    const cube = new Cube({ ctx, width, height, point })
    const rect = new Rect({ ctx, width, height, point })
    // Walls
    let tempPoint = cube.draw({
      w: 8,
      h: 6,
      d: 7,
      color: this.getColor('#D5251F', true),
      point,
    })
    cube.draw({
      w: 8,
      h: 1,
      d: 7,
      color: this.getColor('#FFFFFF'),
      point: tempPoint[2][0],
    })

    // Windows
    rect.draw({
      w: 3,
      h: 4,
      axis: 'x',
      color: this.getColor('#7CA1D2'),
      point,
      coords: { x: 4, y: 1 },
    })
    rect.draw({
      w: 2,
      h: 3,
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
      h: 3,
      axis: 'x',
      color: this.getColor('#7CA1D2'),
      point,
      coords: { x: 1, y: 0 },
    })
  }
}
