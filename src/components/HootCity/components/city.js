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
    console.log('bu')
    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.appendChild(template.content.cloneNode(true))
    this.addListeners()
  }

  get width() {
    return this.getAttribute('width')
  }
  get height() {
    return this.getAttribute('height')
  }
  get rows() {
    return this.getAttribute('rows')
  }
  get columns() {
    return this.getAttribute('columns')
  }
  get offset() {
    return this.getAttribute('offset')
  }

  addListeners() {
    this.addEventListener('click', evt => {
      console.log('hola')
      this.querySelectorAll('hoot-layer').forEach(layer => {
        layer.dispatchEvent(
          new CustomEvent('city-click', {
            detail: evt,
          }),
        )
      })
    })
  }
}

customElements.define('hoot-city', City)
