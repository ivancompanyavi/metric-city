import LayerElement from './layer-element.js'
import { TextTile } from '../models/index.js'

export default class HootTextTile extends LayerElement {
  getData() {
    return {
      text: this.getAttr('text', ''),
      textColor: this.getAttr('textColor', 'white'),
      font: this.getAttr('font', '20px aria'),
    }
  }

  getShape() {
    return TextTile
  }
}

customElements.define('metric-text', HootTextTile)
