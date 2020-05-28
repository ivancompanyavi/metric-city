import { Shape, Dimension2D, Rect } from '../base/index.js'

const ROAD_WIDTH = 1

export default class Road extends Shape {
  draw({ length, direction = 'right' }) {
    const { ctx, width, height, point } = this
    const rect = new Rect({ ctx, width, height, point })
    const road = rect.draw({
      ...new Dimension2D(
        direction === 'right' ? ROAD_WIDTH : length,
        direction === 'right' ? length : ROAD_WIDTH,
      ),
      axis: 'z',
      color: this.getColor('#807e78'),
    })

    rect.color = this.getColor('#ffffff')

    for (let i = 0; i < length; i += 2) {
      if (direction === 'right') {
        rect.draw({
          w: 0.3,
          h: 1,
          axis: 'z',
          coords: { x: i, y: -0.3 },
          color: this.getColor('#ffffff'),
        })
      } else {
        rect.draw({
          w: 1,
          h: 0.3,
          axis: 'z',
          coords: { x: 0.3, y: -i },
          color: this.getColor('#ffffff'),
        })
      }
    }
    return road
  }
}
