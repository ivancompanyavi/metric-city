const template = (key, value) => /*html*/ `
<style>
  div {
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
</style>
<div>
  <input type="text" name="${key}" value="${value}" />
  <label for="${key}">${key}<label>
</div>
`

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
    this.shadowRoot.innerHTML = template(
      this.getAttribute('key'),
      this.getAttribute('value'),
    )
    this.addListeners()
  }
}

customElements.define('metric-form-field', FormField)
