import template from './config-bar.html'

class ConfigBar extends HTMLElement {
  initListeners() {
    document.addEventListener('city-element-clicked', event => {
      const { element } = event.detail
      const elementForm = this.querySelector('metric-form-element')
      elementForm.element = element
    })
  }
  connectedCallback() {
    this.initListeners()
    this.innerHTML = template
  }
}

customElements.define('metric-config-bar', ConfigBar)
