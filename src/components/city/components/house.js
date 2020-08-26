import LayerElement from './layer-element.js'
import { House } from '../models/index.js'
import { getRandomColor } from '../models/index.js'

export default class MetricHouse extends LayerElement {
  getData() {
    return {
      pct: this.getAttr('pct', 0.0),
      w: this.getAttr('w', 4),
      h: this.getAttr('h', 4),
      t: this.getAttr('t', 10),
      color: this.getAttr('color', getRandomColor()),
    }
  }

  getShape() {
    return House
  }
}

customElements.define('metric-house', MetricHouse)
