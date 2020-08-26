import LayerElement from './layer-element.js'
import { Park } from '../models/index.js'

export default class MetricPark extends LayerElement {
  getData() {
    return {
      w: this.getAttr('w', 4),
      h: this.getAttr('h', 4),
    }
  }

  getShape() {
    return Park
  }
}

customElements.define('metric-park', MetricPark)
