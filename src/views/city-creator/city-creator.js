import template from './city-creator.html'

class CityCreator extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template
  }
}

customElements.define('city-creator', CityCreator)
