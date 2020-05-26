import { Cube, Point, Dimension3D, Rect } from '../base/index.js'
import Building from './building.js'

// Perimeter data
const PERIMETER_SIZE = 6
const PERIMETER_COLOR = '#569B2E'

// Building data
const BUILDING_SIZE = 4

// Floor data
const STORY_WINDOW_HEIGHT = 1.9
const STORY_FLOOR_HEIGHT = 0.1
const STORY_HEIGHT = STORY_WINDOW_HEIGHT + STORY_FLOOR_HEIGHT

export default class StackedHouse extends Building {
  drawHitGraph(data) {
    const { w, t, h, pct, color } = data
    const tall = pct === 0.0 ? 0 : t
    const cube = new Cube(this)
    return cube.draw({
      ...new Dimension3D(w, tall, h),
      color,
      point,
      strokeColor: color,
    })
  }

  draw(data) {
    const { pct } = data
    const perimeter = this._drawPerimeter()
    const floors = Math.floor(pct * 10)
    const startingPoint = perimeter[2][0]
    let lastFloor
    for (let i = 0; i < floors; i++) {
      lastFloor = this._drawFloor(startingPoint, i)
    }
    this._drawCeiling(lastFloor)
  }

  _drawFloor(startingPoint, i) {
    const { height } = this
    const pointOffset = (PERIMETER_SIZE - BUILDING_SIZE) / 2

    const cube = new Cube({
      ...this,
      point: {
        x: startingPoint.x,
        y: startingPoint.y - height * i * STORY_HEIGHT - height * pointOffset,
      },
    })

    // Drawing floor
    let c = cube.draw({
      w: BUILDING_SIZE,
      h: STORY_FLOOR_HEIGHT,
      d: BUILDING_SIZE,
      color: 'white',
    })

    cube.point = c[2][0]
    // Drawing windows
    cube.draw({
      w: BUILDING_SIZE,
      h: STORY_WINDOW_HEIGHT,
      d: BUILDING_SIZE,
      color: '#5C8D9BEE',
      strokeColor: 'white',
    })
    // Drawing window frames
    const rect = new Rect({ ...this, point: cube.point })
    const frame = {
      w: 0.01,
      h: STORY_WINDOW_HEIGHT,
      color: 'white',
      strokeColor: '#FFFFFF00',
    }
    for (let i = 0; i < 5; i++) {
      rect.draw({ ...frame, axis: 'x', coords: { x: i, y: 0 } })
      rect.draw({ ...frame, axis: 'y', coords: { x: i, y: 0 } })
    }
    return c
  }

  _drawPerimeter() {
    const cube = new Cube(this)
    return cube.draw({
      ...new Dimension3D(PERIMETER_SIZE, 0.1, PERIMETER_SIZE),
      color: PERIMETER_COLOR,
    })
  }

  _drawCeiling(lastFloor) {
    console.log(lastFloor)
    const point = lastFloor[2][0]
    const cube = new Cube({
      ...this,
      point: {
        x: point.x,
        y: point.y - this.height * STORY_HEIGHT,
      },
    })
    cube.draw({
      w: BUILDING_SIZE,
      h: 0.2,
      d: BUILDING_SIZE,
      color: '#5B5A5F',
    })

    // Drawing fences
    const FENZE_SIZE = 0.2
    cube.draw({
      w: BUILDING_SIZE,
      h: 0.5,
      d: FENZE_SIZE,
      color: 'white',
      strokeColor: '#cccccc',
      point: {
        x: cube.point.x - (this.width / 2) * (BUILDING_SIZE - FENZE_SIZE),
        y: cube.point.y - (this.height / 2) * BUILDING_SIZE,
      },
    })
    cube.draw({
      w: FENZE_SIZE,
      h: 0.5,
      d: BUILDING_SIZE,
      color: 'white',
      strokeColor: '#cccccc',
      point: {
        x: cube.point.x + (this.width / 2) * (BUILDING_SIZE - FENZE_SIZE),
        y: cube.point.y - (this.height / 2) * BUILDING_SIZE,
      },
    })
    cube.draw({
      w: FENZE_SIZE,
      h: 0.5,
      d: BUILDING_SIZE,
      color: 'white',
      strokeColor: '#cccccc',
    })

    cube.draw({
      w: BUILDING_SIZE,
      h: 0.5,
      d: FENZE_SIZE,
      color: 'white',
      strokeColor: '#cccccc',
    })
  }
}
