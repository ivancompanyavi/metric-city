import CityElement from './city-element.js'
import { getRandomColor } from '../models/utils.js'

export class DrawableElement {
  constructor(ctx, isoPos, shape, data) {
    this.ctx = ctx
    this.shape = shape
    this.isoPos = isoPos
    this.data = data
  }
}

export default class LayerElement extends CityElement {
  constructor() {
    super()
    this._ctx = null
    this._hitCtx = null
    this._elements = null
    this.initListeners()
  }

  get x() {
    return parseInt(this.dataset.x) || 0
  }

  get y() {
    return parseInt(this.dataset.y) || 0
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
      if (elem.matches('metric-layer')) return elem
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

  initListeners() {
    document.addEventListener('city-updated', () => {
      this._ctx = null
      this._hitCtx = null
      this._elements = null
      this.draw(this.getDrawable())
    })
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
    this.dataset._hitcolor = color
    drawable.data.id = this.getAttribute('id')
    hitGraphDrawable.drawHitGraph(drawable.data)
    this.elements.push(this)
  }

  getShape() {
    throw Error('Missing mandatory method implementation: getShape')
  }

  getData() {
    return {}
  }

  getDrawable() {
    return new DrawableElement(
      this.ctx,
      { x: this.x, y: this.y },
      this.getShape(),
      this.getData(),
    )
  }

  connectedCallback() {
    super.connectedCallback()
    this.draw(this.getDrawable())
  }
}
