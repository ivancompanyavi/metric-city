import LayerElement from './layer-element'
import { Hospital } from '../models'

export default class HootHospital extends LayerElement {
  getData() {
    return {}
  }

  getShape() {
    return Hospital
  }
}

customElements.define('hoot-hospital', HootHospital)
