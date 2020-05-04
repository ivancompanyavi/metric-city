import LayerElement from './layer-element'
import { FireStation } from '../models'

export default class HootFireStation extends LayerElement {
  getData() {
    return {}
  }

  getShape() {
    return FireStation
  }
}

customElements.define('metric-fire-station', HootFireStation)
