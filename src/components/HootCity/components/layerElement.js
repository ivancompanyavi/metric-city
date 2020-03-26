import CityElement from './cityElement'
import { DrawableElement } from '../models'
import { getRandomColor } from '../../../common/engine/utils'

export default class LayerElement extends CityElement {
  constructor() {
    super()
    this._ctx = null
  }

  get x() {
    return this.getAttr('x', 0)
  }

  get y() {
    return this.getAttr('y', 0)
  }

  get ctx() {
    if (!this._ctx) {
      const layer = this._getClosestLayer()
      this._ctx = layer.shadowRoot.querySelector('canvas').getContext('2d')
    }
    return this._ctx
  }

  get hitCtx() {
    if (!this._hitCtx) {
      const layer = this._getClosestLayer()
      this._hitCtx = layer._hitCtx
    }
    return this._hitCtx
  }

  get elements() {
    if (!this._elements) {
      const layer = this._getClosestLayer()
      this._elements = layer.elements
    }
    return this._elements
  }

  _getClosestLayer() {
    let elem = this
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.matches('hoot-layer')) return elem
    }
  }

  isometricToCartesian(isoPos) {
    const { width, height, rows } = this
    const { x, y } = isoPos
    const x0 = width / 2 + this.offset
    const y0 = height / 2 + (height * rows) / 2 + this.offset
    return {
      x: x0 + (x * width) / 2 + (y * width) / 2,
      y: y0 - (x * height) / 2 + (y * height) / 2,
    }
  }

  draw(drawable) {
    const { width, height } = this
    const s = new drawable.shape({
      ctx: drawable.ctx,
      width,
      height,
      point: this.isometricToCartesian(drawable.isoPos),
    })

    const coords = s.draw(drawable.data)
    this.drawHitGraph(drawable)
    return coords
  }

  drawHitGraph(drawable) {
    const { width, height } = this

    const hitGraphDrawable = new drawable.shape({
      ctx: this.hitCtx,
      width,
      height,
      point: this.isometricToCartesian(drawable.isoPos),
    })
    const color = getRandomColor()
    drawable.data.color = color
    hitGraphDrawable.drawHitGraph(drawable.data)
    this.elements.push(drawable)
  }

  getShape() {
    throw Error('Missing mandatory method implementation: getShape')
  }

  getData() {
    return {}
  }

  connectedCallback() {
    const drawable = new DrawableElement(
      this.ctx,
      { x: this.x, y: this.y },
      this.getShape(),
      this.getData(),
    )
    this.draw(drawable)
  }
}
