import template from './form-element.html'

class FormElement extends HTMLElement {
  constructor() {
    super()
    this._element = null
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
    const form = this.shadowRoot.querySelector('form')
    while (form.firstChild) {
      form.removeChild(form.firstChild)
    }
  }

  show() {
    this.shadowRoot.querySelector('div').setAttribute('class', 'shown')
  }

  hide() {
    this.shadowRoot.querySelector('div').removeAttribute('class')
  }

  renderField(key, value) {
    const form = this.shadowRoot.querySelector('form')
    const elm = document.createElement('metric-form-field')
    elm.setAttribute('key', key)
    elm.setAttribute('value', value)
    elm.element = this.element
    form.insertAdjacentElement('beforeend', elm)
  }

  render() {
    const fieldset = this.buildInputMap()
    fieldset.forEach(field => {
      this.renderField(...field)
    })
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = template
  }
}

customElements.define('metric-form-element', FormElement)
