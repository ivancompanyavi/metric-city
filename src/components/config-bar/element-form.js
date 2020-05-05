const template = /*html*/ `
<style>
    metric-element-form {
        display: none;
    }
    metric-element-form.shown {
      display: block;
    }
    .fieldset {
      display: flex;
      border: 1px solid var(--color-silver);
      border-radius: 5px;
      color: var(--color-silver);
      margin-bottom: 15px;
      padding: 10px;
    }
    input {
      border: 0;
      flex: 1;
      background-color: var(--color-grey);
      color: var(--color-silver);
    }
    label {
      flex: 0;
    }
    h3 {
      padding: 0 20px 20px 20px;
      margin: 0;
      border-bottom: 1px solid var(--color-silver);
      margin-bottom: 20px;
    }
</style>
<h3>Element settings</h3>
<form></form>
`

const inputTpl = (key, value) => /*html*/ `
  <div class="fieldset">
    <input type="text" name="${key}" value="${value}" />
    <label for="${key}">${key}<label>
  </div>
`

class ElementForm extends HTMLElement {
  constructor() {
    super()
    this._element = []
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
    const form = this.querySelector('form')
    console.log(form)
    while (form.firstChild) {
      form.removeChild(form.firstChild)
    }
  }

  show() {
    this.setAttribute('class', 'shown')
  }

  hide() {
    this.removeAttribute('class')
  }

  render() {
    const fieldset = this.buildInputMap()
    const form = this.querySelector('form')
    fieldset.forEach(field => {
      form.insertAdjacentHTML('beforeend', inputTpl(...field))
    })
    this.addInputListeners()
  }

  addInputListeners() {
    const inputs = this.querySelectorAll('input')
    inputs.forEach(input => {
      input.addEventListener('change', evt => {
        const { name, value } = evt.target
        this.element.dataset[name] = value
        this.updateCity()
      })
    })
  }

  updateCity() {
    document.dispatchEvent(new Event('city-updated'))
  }

  connectedCallback() {
    this.innerHTML = template
  }
}

customElements.define('metric-element-form', ElementForm)
