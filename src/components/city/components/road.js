import LayerElement from './layer-element'
import { Road } from '../models'

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

customElements.define('metric-road', HootRoad)
