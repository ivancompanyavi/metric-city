import CityElement from './city-element.js'
import { layerCounter } from '../models/index.js'

const SIDEBAR_WIDTH = 100
const HEADER_HEIGHT = 60

const template = `
  <style>
    canvas {
      position: absolute;
    }
    #hitgraph {
      opacity: 1;
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
    this.initListeners()
  }

  init() {
    this.elements = []
    this.tpl = this.initTemplate()
    const _hitGraph = this.tpl.content.getElementById('hitgraph')
    this._hitCtx = _hitGraph.getContext('2d')
    this.initCanvas('layer')
    this.initCanvas('hitgraph')
    this.initShadow()
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

  initCanvas(canvasName) {
    const canvas = this.tpl.content.getElementById(canvasName)
    canvas.setAttribute('width', this.width * this.rows)
    canvas.setAttribute('height', this.height * this.columns)
  }

  initListeners() {
    document.addEventListener('city-click', evt => {
      const element = this.getClickedElement(evt)
      const event = new CustomEvent('city-element-clicked', {
        detail: {
          element,
          layerId: this.layerId,
        },
      })
      document.dispatchEvent(event)
    })

    document.addEventListener('city-updated', () => {
      this.init()
    })
  }
  getMousePosition(evt) {
    return { x: evt.pageX, y: evt.pageY }
  }

  getClickedElement(evt) {
    const point = this.getMousePosition(evt.detail)
    const pixel = this._hitCtx.getImageData(
      point.x - SIDEBAR_WIDTH,
      point.y - HEADER_HEIGHT,
      1,
      1,
    ).data
    const color = `#${this.componentToHex(pixel[0])}${this.componentToHex(
      pixel[1],
    )}${this.componentToHex(pixel[2])}`
    console.log(color)
    for (let el of this.elements) {
      console.log(`${el.localName} -> ${el.dataset._hitcolor}`)
    }
    return this.elements.find(e => e.dataset._hitcolor === color.toUpperCase())
  }

  componentToHex(c) {
    var hex = c.toString(16)
    return hex.length == 1 ? '0' + hex : hex
  }
}

customElements.define('metric-layer', Layer)
