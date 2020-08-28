import template from './form-element.html'

class FormElement extends HTMLElement {
  constructor() {
    super()
    this._element = null
    this.attachShadow({ mode: 'open' })
    this.configBar = document.querySelector('metric-config-bar > aside')
  }

  set element(elem) {
    this._element = elem
    this.clearForm()
    if (elem) {
      this.render()
      this.show()
    } else {
      this.hide()
    }
  }

  get element() {
    return this._element
  }

  buildInputMap() {
    const inputs = []
    Object.keys(this.element.dataset).forEach(field => {
      if (!field.startsWith('_')) {
        inputs.push([field, this.element.dataset[field]])
      }
    })
    return inputs
  }

  clearForm() {
    if (this.form) {
      while (this.form.firstChild) {
        this.form.removeChild(this.form.firstChild)
      }
    }
  }

  show() {
    this.configBar.setAttribute('class', 'shown')
  }

  hide() {
    this.configBar.removeAttribute('class')
  }

  renderField(key, value) {
    const elm = document.createElement('metric-form-field')
    elm.setAttribute('key', key)
    elm.setAttribute('value', value)
    elm.element = this.element
    this.form.insertAdjacentElement('beforeend', elm)
  }

  render() {
    const fieldset = this.buildInputMap()
    fieldset.forEach(field => {
      this.renderField(...field)
    })
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = template
    this.form = this.shadowRoot.querySelector('form')
  }
}

customElements.define('metric-form-element', FormElement)
