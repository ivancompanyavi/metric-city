import LayerElement from './layer-element'
import { Park } from '../models'

export default class HootPark extends LayerElement {
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

customElements.define('metric-park', HootPark)
