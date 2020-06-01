import { Shape, Dimension2D, Rect, Cube } from '../base/index.js'

const ROAD_WIDTH = 2
const ROAD_LINE_WIDTH = ROAD_WIDTH / 10
const SIDEPATH_WIDTH = ROAD_WIDTH / 5
const SIDEPATH_COLOR = '#d1d1d1'

export default class Road extends Shape {
  draw(data) {
    this._drawRoad(data)
    this._drawRoadLines(data)
    this._drawSidePaths(data)
  }

  _drawRoad(data) {
    const { length, direction = 'right' } = data
    const rect = new Rect(this)
    rect.draw({
      ...new Dimension2D(
        direction === 'right' ? ROAD_WIDTH : length,
        direction === 'right' ? length : ROAD_WIDTH,
      ),
      axis: 'z',
      color: this.getColor('#807e78'),
    })
  }

  _drawRoadLines({ length, direction = 'right' }) {
    const rect = new Rect(this)
    rect.color = this.getColor('#ffffff')

    const lineCoord = ROAD_WIDTH / 2 - ROAD_LINE_WIDTH / 2
    for (let i = 0; i < length; i += 2) {
      if (direction === 'right') {
        rect.draw({
          w: ROAD_LINE_WIDTH,
          h: 1,
          axis: 'z',
          coords: { x: i, y: lineCoord * -1 },
          color: this.getColor('#ffffff'),
        })
      } else {
        rect.draw({
          w: 1,
          h: ROAD_LINE_WIDTH,
          axis: 'z',
          coords: { x: lineCoord, y: -i },
          color: this.getColor('#ffffff'),
        })
      }
    }
  }

  _drawSidePaths(data) {
    const { length, direction } = data
    const cube = new Cube({ ...this })
    let cubeData
    if (direction === 'right') {
      cubeData = {
        w: length,
        h: 0.1,
        d: SIDEPATH_WIDTH,
        color: SIDEPATH_COLOR,
      }
      cube.draw(cubeData)
      cube.draw({
        ...cubeData,
        point: {
          x:
            this.point.x -
            (this.width * ROAD_WIDTH) / 2 +
            (this.width * SIDEPATH_WIDTH) / 2,
          y:
            this.point.y -
            (this.height * ROAD_WIDTH) / 2 +
            (this.height * SIDEPATH_WIDTH) / 2,
        },
      })
    } else {
      cubeData = {
        w: SIDEPATH_WIDTH,
        h: 0.1,
        d: length,
        color: SIDEPATH_COLOR,
      }
      cube.draw(cubeData)
      cube.draw({
        ...cubeData,
        point: {
          x:
            this.point.x +
            (this.width * ROAD_WIDTH) / 2 -
            (this.width * SIDEPATH_WIDTH) / 2,
          y:
            this.point.y -
            (this.height * ROAD_WIDTH) / 2 +
            (this.height * SIDEPATH_WIDTH) / 2,
        },
      })
    }
  }
}
