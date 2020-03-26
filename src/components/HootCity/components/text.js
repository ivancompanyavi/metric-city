import LayerElement from './layerElement'
import { TextTile } from '../../../common/engine'

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

customElements.define('hoot-text', HootTextTile)
