import LayerElement from './layer-element.js'
import { TileMap } from '../models/index.js'

export default class HootTileMap extends LayerElement {
  get color() {
    return this.dataset.color
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

customElements.define('metric-tile-map', HootTileMap)
