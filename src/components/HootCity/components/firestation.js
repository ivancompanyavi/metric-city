import LayerElement from './layerElement'
import { FireStation } from '../../../common/engine'

export default class HootFireStation extends LayerElement {
  getData() {
    return {}
  }

  getShape() {
    return FireStation
  }
}

customElements.define('hoot-fire-station', HootFireStation)
