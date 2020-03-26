import Building from './building'
import { Rect } from '../base'

export default class TileMap extends Building {
  drawHitGraph(data) {
    this.draw(data)
  }
  draw(data) {
    const { ctx, width, height, point } = this
    const { color, rows, columns } = data
    const d = { w: 1, h: 1, axis: 'z', color }
    const rect = new Rect({ ctx, width, height, point })
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        rect.draw({ ...d, coords: { x: i, y: j } })
      }
    }
  }
}
