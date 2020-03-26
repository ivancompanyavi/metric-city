import LayerElement from './layerElement'
import { Hospital } from '../../../common/engine'

export default class HootHospital extends LayerElement {
  getData() {
    return {}
  }

  getShape() {
    return Hospital
  }
}

customElements.define('hoot-hospital', HootHospital)
