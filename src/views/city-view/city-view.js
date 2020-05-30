import cityJson from './fixtures.js'
import { cityParser } from '../models.js'

class CityView extends HTMLElement {
  connectedCallback() {
    const content = cityParser(cityJson)
    this.appendChild(content)
  }
}

customElements.define('city-view', CityView)
