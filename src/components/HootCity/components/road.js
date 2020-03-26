import LayerElement from './layerElement'
import { Road } from '../../../common/engine'

export default class HootRoad extends LayerElement {
  getData() {
    let defaultLength = this.city.columns
    const dir = this.getAttr('direction', 'right')
    if (dir === 'right') {
      defaultLength = this.city.rows
    }
    return {
      length: this.getAttr('length', defaultLength),
      direction: dir,
    }
  }

  getShape() {
    return Road
  }
}

customElements.define('hoot-road', HootRoad)
