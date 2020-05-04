const template = document.createElement('template')
template.innerHTML = `
  <style>
  :host {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
  </style>
  <slot></slot>
`

export default class City extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.appendChild(template.content.cloneNode(true))
    this.initListeners()
  }

  get width() {
    return this.dataset.width
  }

  set width(newValue) {
    this.dataset.width = newValue
  }

  get height() {
    return this.dataset.height
  }

  set height(newValue) {
    this.dataset.height = newValue
  }

  get rows() {
    return this.dataset.rows
  }

  set rows(newValue) {
    this.dataset.rows = newValue
  }

  get columns() {
    return this.dataset.columns
  }

  set columns(newValue) {
    this.dataset.columns = newValue
  }

  get offset() {
    return this.dataset.offset
  }

  initListeners() {
    this.addEventListener('click', evt => {
      document.dispatchEvent(new CustomEvent('city-click', { detail: evt }))
    })
    let layerEventBuffer = []
    document.addEventListener('city-element-clicked', evt => {
      const layers = this.querySelectorAll('metric-layer')
      layerEventBuffer.push(evt.detail)
      if (layerEventBuffer.length === layers.length) {
        console.log(this.processLayerEvents(layerEventBuffer))
        layerEventBuffer = []
      }
    })
  }

  processLayerEvents(events) {
    events.sort((a, b) => b.layerId - a.layerId)
    const filteredEvents = events.filter(e => e.element)
    if (filteredEvents.length) {
      return filteredEvents[0]
    }
  }
}

customElements.define('metric-city', City)
