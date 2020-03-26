export default class CityElement extends HTMLElement {
  constructor() {
    super()
    this._city = null
  }

  getAttr(key, defaultValue) {
    let value = this.getAttribute(key)
    if (value === undefined || value === null) {
      return defaultValue
    }
    return value
  }

  get city() {
    if (!this._city) {
      this._city = document.querySelector('hoot-city')
    }
    return this._city
  }

  get width() {
    return this.city.getAttribute('width')
  }

  get height() {
    return this.city.getAttribute('height')
  }
  get rows() {
    return this.city.getAttribute('rows')
  }
  get columns() {
    return this.city.getAttribute('columns')
  }
  get offset() {
    return this.city.getAttribute('offset')
  }
}
