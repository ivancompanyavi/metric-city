import template from './button-set.html'

class ButtonSet extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = template
    this.addListeners()
  }

  addListeners() {
    this.shadowRoot.addEventListener('click', evt => {
      const items = this.shadowRoot.querySelector('slot > *')
      items.forEach(item => {
        if (item.isEqualNode(evt.target)) {
          item.setAttribute('active', true)
        } else {
          item.setAttribute('active', false)
        }
      })
    })
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('click', evt => {})
  }
}

customElements.define('metric-button-set', ButtonSet)
