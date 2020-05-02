import Shape from '../base/shape'

const percentColors = [
  { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
  { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
  { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } },
]

function calculateColor(pct) {
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

export default class Building extends Shape {
  constructor(data) {
    super(data)
    this.pct = data.pct || 0
  }

  getColor(color, wall = false) {
    if (wall && this.pct) {
      return calculateColor(this.pct)
    }
    return super.getColor(color)
  }
}
