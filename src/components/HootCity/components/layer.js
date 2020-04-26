import CityElement from './cityElement'
import { getMousePosition, layerCounter } from '../models'

const template = `
  <style>
    :host {
      width: 100%;
      height: 100%;
    }
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
    this.elements = []
    const tpl = this.initTemplate()
    const _hitGraph = tpl.content.getElementById('hitgraph')
    this._hitCtx = _hitGraph.getContext('2d')
    this.initHitGraph(tpl)
    this.initCanvas(tpl)
    this.initShadow(tpl)
    this.initListeners()
  }

  initTemplate() {
    const tpl = document.createElement('template')
    tpl.innerHTML = template
    return tpl
  }

  initShadow(tpl) {
    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.appendChild(tpl.content)
  }

  initCanvas(tpl) {
    const canvas = tpl.content.getElementById('layer')
    canvas.setAttribute('width', this.width * this.rows)
    canvas.setAttribute('height', this.height * this.columns)
  }

  initHitGraph(tpl) {
    const canvas = tpl.content.getElementById('hitgraph')
    canvas.setAttribute('width', this.width * this.rows)
    canvas.setAttribute('height', this.height * this.columns)
  }

  initListeners() {
    this.addEventListener('city-click', evt => {
      const point = getMousePosition(evt.detail)
      const pixel = this._hitCtx.getImageData(point.x, point.y, 1, 1).data
      const color = `#${this.componentToHex(pixel[0])}${this.componentToHex(
        pixel[1],
      )}${this.componentToHex(pixel[2])}`
      const element = this.getClickedElement(color)
      this.city.dispatchEvent(
        new CustomEvent('city-element-clicked', {
          detail: {
            element,
            layerId: this.layerId,
          },
        }),
      )
    })
  }

  getClickedElement(color) {
    return this.elements.find(e => e.data.color === color.toUpperCase())
  }

  componentToHex(c) {
    var hex = c.toString(16)
    return hex.length == 1 ? '0' + hex : hex
  }
}

customElements.define('hoot-layer', Layer)
