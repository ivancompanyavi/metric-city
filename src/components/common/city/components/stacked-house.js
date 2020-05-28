import LayerElement from './layer-element.js'
import { StackedHouse } from '../models/index.js'
import { getRandomColor } from '../models/index.js'

export default class MetricStackedHouse extends LayerElement {
  getData() {
    return {
      pct: this.getAttr('pct', 0.0),
      color: getRandomColor(),
    }
  }

  getShape() {
    return StackedHouse
  }
}

customElements.define('metric-stacked-house', MetricStackedHouse)
