const template = /*html*/ `
  <style>
    hoot-config-bar {
      position: absolute;
      right: 0;
      height: 100%;
      width: 350px;
      background: blue;
    }
  </style>
  <aside>

  </aside>
`

class ConfigBar extends HTMLElement {
  constructor() {
    super()
    this.initListeners()
  }

  initListeners() {
    this.addEventListener('city-element-clicked', evt => {
      const city = document.querySelector('hoot-city')
      city.width = 20
      city.height = 10
      const updatedCity = new Event('city-updated')
      document.dispatchEvent(updatedCity)
    })
  }

  connectedCallback() {
    this.innerHTML = template
  }
}

customElements.define('hoot-config-bar', ConfigBar)
