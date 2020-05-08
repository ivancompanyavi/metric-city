import LayerElement from './layer-element.js'
import { Hospital } from '../models/index.js'

export default class HootHospital extends LayerElement {
  getData() {
    return {}
  }

  getShape() {
    return Hospital
  }
}

customElements.define('metric-hospital', HootHospital)
