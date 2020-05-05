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

  </style>
  <aside>
    <metric-city-form></metric-city-form>
    <metric-element-form></metric-element-form>
  </aside>
`

class ConfigBar extends HTMLElement {
  initListeners() {
    document.addEventListener('city-element-clicked', event => {
      const { element } = event.detail
      const elementForm = this.querySelector('metric-element-form')
      elementForm.element = element
    })
  }
  connectedCallback() {
    this.initListeners()
    this.innerHTML = template
  }
}

customElements.define('metric-config-bar', ConfigBar)
