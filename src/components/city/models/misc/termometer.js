import { Shape, Cube, Dimension3D } from '../base/index.js'

const percentColors = [
  { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
  { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
  { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } },
]

export default class Termometer extends Shape {
  static calculateColor(pct) {
    let i
    for (i = 1; i < percentColors.length - 1; i++) {
      if (pct < percentColors[i].pct) {
        break
      }
    }
    const lower = percentColors[i - 1]
    const upper = percentColors[i]
    const range = upper.pct - lower.pct
    const rangePct = (pct - lower.pct) / range
    const pctLower = 1 - rangePct
    const pctUpper = rangePct
    const color = {
      r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
      g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
      b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
    }
    return `#${color.r.toString(16).padStart(2, '0')}${color.g
      .toString(16)
      .padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`
    // or output as hex if preferred
  }
  draw({ percentage = 0, point = this.point }) {
    const { ctx, tile } = this
    const cube = new Cube({ ctx, tile, point })
    const color = Termometer.calculateColor(percentage)
    cube.draw({ ...new Dimension3D(1, 4, 1), color, point })
  }
}
