import Building from './building.js'
import { Rect } from '../base/index.js'

export default class TileMap extends Building {
  drawHitGraph(data) {
    this.draw({ ...data, strokeColor: data.color })
  }
  draw(data) {
    const { ctx, width, height, point } = this
    const { color, rows, columns, strokeColor } = data
    const d = { w: 1, h: 1, axis: 'z', color, strokeColor }
    const rect = new Rect({ ctx, width, height, point })
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        rect.draw({ ...d, coords: { x: i, y: j } })
      }
    }
  }
}
