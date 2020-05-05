const template = /*html*/ `
<style>
    h3 {
      padding: 0 20px 20px 20px;
      margin: 0;
      border-bottom: 1px solid var(--color-silver);
      margin-bottom: 20px;
    }
</style>
<div>
  <h3>City settings</h3>
  <form></form>
</div>
`

class FormCity extends HTMLElement {
  constructor() {
    super()
    this.city = document.querySelector('metric-city')
  }

  buildInputMap() {
    const inputs = []
    Object.keys(this.city.dataset).forEach(field => {
      if (!field.startsWith('_')) {
        inputs.push([field, this.city.dataset[field]])
      }
    })
    return inputs
  }

  renderField(key, value) {
    const form = this.shadowRoot.querySelector('form')
    const elm = document.createElement('metric-form-field')
    elm.setAttribute('key', key)
    elm.setAttribute('value', value)
    elm.element = this.city
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
    this.render()
  }
}

customElements.define('metric-form-city', FormCity)
