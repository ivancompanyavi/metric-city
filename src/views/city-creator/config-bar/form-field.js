import template from './form-field.html'

class FormField extends HTMLElement {
  constructor() {
    super()
    this._element = null
  }

  set element(elm) {
    this._element = elm
  }

  get element() {
    return this._element
  }

  addListeners() {
    this.shadowRoot.querySelector('input').addEventListener('change', evt => {
      const { name, value } = evt.target
      this.element.dataset[name] = value
      this.updateCity()
    })
  }

  updateCity() {
    document.dispatchEvent(new Event('city-updated'))
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    const key = this.getAttribute('key')
    const value = this.getAttribute('value')
    this.shadowRoot.innerHTML = template
    const label = this.shadowRoot.querySelector('label')
    const input = this.shadowRoot.querySelector('input')
    label.setAttribute('for', key)
    label.appendChild(document.createTextNode(key))
    input.setAttribute('name', value)
    input.setAttribute('value', value)
    this.addListeners()
  }
}

customElements.define('metric-form-field', FormField)
