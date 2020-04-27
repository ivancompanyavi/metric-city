import CityElement from './HootCity/components/cityElement'

class ConfigBar extends CityElement {
  constructor() {
    super()
    this.initListeners()
  }

  initListeners() {
    this.addEventListener('city-element-clicked', evt => {
      this.city.width = 20
    })
  }
}

customElements.define('hoot-config-bar', ConfigBar)
