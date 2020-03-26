import LayerElement from './layerElement'
import { Park } from '../../../common/engine'

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

customElements.define('hoot-park', HootPark)
