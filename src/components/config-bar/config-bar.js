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
      box-sizing: border-box;
    }

  </style>
  <aside>
    <metric-form-city></metric-form-city>
    <metric-form-element></metric-form-element>
  </aside>
`

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
