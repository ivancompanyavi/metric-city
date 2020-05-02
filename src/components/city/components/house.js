import LayerElement from './layer-element'
import { House } from '../models'
import { getRandomColor } from '../models'

export default class HootHouse extends LayerElement {
  getData() {
    return {
      pct: this.getAttr('pct', 0.0),
      w: this.getAttr('w', 4),
      h: this.getAttr('h', 4),
      t: this.getAttr('t', 10),
      color: this.getAttr('color', getRandomColor()),
    }
  }

  getShape() {
    return House
  }
}

customElements.define('hoot-house', HootHouse)
