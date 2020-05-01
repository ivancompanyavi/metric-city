import CityElement from './cityElement'
import { getMousePosition, layerCounter } from '../models'

const SIDEBAR_WIDTH = 100
const HEADER_HEIGHT = 60

const template = `
  <style>
    canvas {
      position: absolute;
    }
    #hitgraph {
      opacity: 0;
    }
  </style>
  <canvas id="layer"></canvas>
  <canvas id="hitgraph"></canvas>
`

export default class Layer extends CityElement {
  constructor() {
    super()
    this.layerId = layerCounter.getCount()

    this.init()
  }

  init() {
    this.elements = []
    this.tpl = this.initTemplate()
    const _hitGraph = this.tpl.content.getElementById('hitgraph')
    this._hitCtx = _hitGraph.getContext('2d')
    this.initHitGraph()
    this.initCanvas()
    this.initShadow()
    this.initListeners()
  }

  initTemplate() {
    const tpl = document.createElement('template')
    tpl.innerHTML = template
    return tpl
  }

  initShadow() {
    if (!this.shadow) {
      this.shadow = this.attachShadow({ mode: 'open' })
    }
    this.shadow.textContent = ''
    this.shadow.appendChild(this.tpl.content)
  }

  initCanvas() {
    const canvas = this.tpl.content.getElementById('layer')
    canvas.setAttribute('width', this.width * this.rows)
    canvas.setAttribute('height', this.height * this.columns)
  }

  initHitGraph() {
    console.log(this)
    const canvas = this.tpl.content.getElementById('hitgraph')
    canvas.setAttribute('width', this.width * this.rows)
    canvas.setAttribute('height', this.height * this.columns)
  }

  initListeners() {
    this.addEventListener('city-click', evt => {
      const element = this.getClickedElement(evt)
      const event = new CustomEvent('city-element-clicked', {
        detail: {
          element,
          layerId: this.layerId,
        },
      })
      this.city.dispatchEvent(event)
      if (this.configBar) {
        this.configBar.dispatchEvent(event)
      }
    })

    document.addEventListener('city-updated', () => {
      this.init()
    })
  }

  getClickedElement(evt) {
    const point = getMousePosition(evt.detail)
    const pixel = this._hitCtx.getImageData(
      point.x - SIDEBAR_WIDTH,
      point.y - HEADER_HEIGHT,
      1,
      1,
    ).data
    const color = `#${this.componentToHex(pixel[0])}${this.componentToHex(
      pixel[1],
    )}${this.componentToHex(pixel[2])}`
    return this.elements.find(e => e.data.color === color.toUpperCase())
  }

  componentToHex(c) {
    var hex = c.toString(16)
    return hex.length == 1 ? '0' + hex : hex
  }
}

customElements.define('hoot-layer', Layer)
