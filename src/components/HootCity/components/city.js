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
    return this.getAttribute('width')
  }

  set width(newValue) {
    this.setAttribute('width', newValue)
  }

  get height() {
    return this.getAttribute('height')
  }

  set height(newValue) {
    this.setAttribute('height', newValue)
  }

  get rows() {
    return this.getAttribute('rows')
  }

  set rows(newValue) {
    this.setAttribute('rows', newValue)
  }

  get columns() {
    return this.getAttribute('columns')
  }

  set columns(newValue) {
    this.setAttribute('columns', newValue)
  }

  get offset() {
    return this.getAttribute('offset')
  }

  initListeners() {
    this.addEventListener('click', evt => {
      const layers = this.querySelectorAll('hoot-layer')
      layers.forEach(layer => {
        layer.dispatchEvent(new CustomEvent('city-click', { detail: evt }))
      })
    })
    let layerEventBuffer = []
    this.addEventListener('city-element-clicked', evt => {
      const layers = this.querySelectorAll('hoot-layer')
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

  static get observedAttributes() {
    return ['width', 'height']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`${name}: from ${oldValue} to ${newValue}`)
  }
}

customElements.define('hoot-city', City)
