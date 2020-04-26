import { Shape, Dimension2D, Rect } from '../base'

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

    for (let i = 0; i < length; i += 2) {
      rect.draw({
        ...new Dimension2D(
          direction === 'left' ? 1 : 0.3,
          direction === 'left' ? 0.3 : 1,
        ),
        axis: 'z',
        color: this.getColor('#ffffff'),
        coords: {
          x: direction === 'left' ? 0 : i,
          y: direction === 'left' ? -i : 0,
        },
        point: {
          x:
            direction === 'left'
              ? this.point.x - width / 2
              : this.point.x + width / 2,
          y:
            direction === 'left'
              ? this.point.y - height / 2
              : this.point.y - height / 2,
        },
      })
    }
    return road
  }
}
