import LayerElement from './layer-element.js'
import { Hospital } from '../models/index.js'

export default class MetricHospital extends LayerElement {
  getData() {
    return {}
  }

  getShape() {
    return Hospital
  }
}

customElements.define('metric-hospital', MetricHospital)
