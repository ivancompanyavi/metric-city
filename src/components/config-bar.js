const template = /*html*/ `
  <style>
    hoot-config-bar {
      position: absolute;
      right: 0;
      height: 100%;
      width: 350px;
      background: var(--color-grey);
    }
  </style>
  <aside>
    <form>
    </form>
  </aside>
`

class ConfigBar extends HTMLElement {
  constructor() {
    super()
    this.initListeners()
    this.inputs = []
    this.selectedElement = null
  }

  initListeners() {
    document.addEventListener('city-element-clicked', evt => {
      this.selectedElement = event.detail.element
      this.inputs = this.renderInputs(event.detail.element)
      this.render()
    })
  }

  renderInputs(element) {
    const inputs = []
    Object.keys(element.dataset).forEach(field => {
      if (!field.startsWith('_')) {
        inputs.push([field, element.dataset[field]])
      }
    })
    return inputs
  }

  render() {
    const form = this.querySelector('form')
    this.inputs.forEach(field => {
      form.insertAdjacentHTML(
        'beforeend',
        /*html*/ `
      <div class="fieldset">
        <label for="${field[0]}">${field[0]}<label>
        <input type="text" name="${field[0]}" value="${field[1]}" />
      </div>
      `,
      )
    })
    this.addInputListeners()
  }

  addInputListeners() {
    const inputs = this.querySelectorAll('input')
    console.log(inputs)
    inputs.forEach(input => {
      input.addEventListener('change', evt => {
        const key = evt.target.name
        const value = evt.target.value
        this.selectedElement.dataset[key] = value
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

customElements.define('hoot-config-bar', ConfigBar)
