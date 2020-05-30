import LayerElement from './layer-element.js'
import { FireStation } from '../models/index.js'

export default class HootFireStation extends LayerElement {
  getData() {
    return {}
  }

  getShape() {
    return FireStation
  }
}

customElements.define('metric-fire-station', HootFireStation)
