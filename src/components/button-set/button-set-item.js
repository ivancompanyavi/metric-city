import template from './button-set-item.html'

class ButtonSetItem extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = template
  }
}

customElements.define('metric-button-set-item', ButtonSetItem)
