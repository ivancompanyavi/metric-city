import LayerElement from './layerElement'
import { TileMap } from '../../../common/engine'

export default class HootTileMap extends LayerElement {
  get color() {
    return this.getAttribute('color')
  }

  getData() {
    return {
      rows: this.rows,
      columns: this.columns,
      color: this.color,
    }
  }

  getShape() {
    return TileMap
  }
}

customElements.define('hoot-tile-map', HootTileMap)
