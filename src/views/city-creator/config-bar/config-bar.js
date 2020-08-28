import template from './config-bar.html'

class ConfigBar extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = template
    this.initListeners()
  }
  initListeners() {
    document.addEventListener('city-element-clicked', event => {
      const { element } = event.detail
      const elementForm = this.querySelector('metric-form-element')
      elementForm.element = element
    })
  }
}

customElements.define('metric-config-bar', ConfigBar)
