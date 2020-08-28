import template from './city-creator.html'

class CityCreator extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = template

    const city = document.querySelector('metric-city')
    const elementForm = this.querySelector('metric-form-element')
    this.citySettings = this.querySelector('#city-settings')
    this.citySettings.addEventListener('click', evt => {
      console.log(elementForm)
      elementForm.element = city
      evt.stopPropagation()
    })
  }
}

customElements.define('city-creator', CityCreator)
