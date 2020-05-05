const template = /*html*/ `
  <style>
    metric-config-bar {
      position: absolute;
      height: calc(100vh - 60px);
      right: 0;
      top: 60px;
      width: 350px;
      background: var(--color-grey);
      color: var(--color-white);
      padding-top: 20px;
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
  <aside class="hidden">
    <div class="city-settigns">
      <h3>City Settings</h3>
      <form id="city"></form>
    </div>
    <form id="element">
    </form>
  </aside>
`

const inputTpl = (key, value) => /*html*/ `
  <div class="fieldset">
    <input type="text" name="${key}" value="${value}" />
    <label for="${key}">${key}<label>
  </div>
`

class ConfigBar extends HTMLElement {
  constructor() {
    super()
    this.initListeners()
    this.selectedElement = null
  }

  initListeners() {
    document.addEventListener('city-element-clicked', event => {
      this.selectedElement = event.detail.element
      this.clearForm()
      if (this.selectedElement) {
        this.renderElementForm(event.detail.element)
      }
    })
  }

  clearForm() {
    const form = this.querySelector('form#element')
    while (form.firstChild) {
      form.removeChild(form.firstChild)
    }
  }

  buildInputMap(element) {
    const inputs = []
    Object.keys(element.dataset).forEach(field => {
      if (!field.startsWith('_')) {
        inputs.push([field, element.dataset[field]])
      }
    })
    return inputs
  }

  renderElementForm(element) {
    const form = this.querySelector('form#element')
    const inputs = this.buildInputMap(element)
    form.insertAdjacentHTML('beforeend', /*html*/ `<h3>Element settings</h3>`)
    inputs.forEach(field => {
      form.insertAdjacentHTML('beforeend', inputTpl(...field))
    })
    this.addElementInputListeners()
  }

  addElementInputListeners() {
    const inputs = this.querySelectorAll('form#element input')
    console.log(inputs)
    inputs.forEach(input => {
      input.addEventListener('change', evt => {
        const { name, value } = evt.target
        this.selectedElement.dataset[name] = value
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

customElements.define('metric-config-bar', ConfigBar)
