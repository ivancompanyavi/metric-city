function getRandomId() {
  return '_' + Math.random().toString(36).substr(2, 9)
}

export default class CityElement extends HTMLElement {
  constructor() {
    super()
    this._city = null
  }

  getAttr(key, defaultValue) {
    let value = this.dataset[key]
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
    return this.city.dataset.width
  }

  get height() {
    return this.city.dataset.height
  }
  get rows() {
    return this.city.dataset.rows
  }
  get columns() {
    return this.city.dataset.columns
  }
  get offset() {
    return this.city.dataset.offset || 0
  }

  connectedCallback() {
    this.setAttribute('id', getRandomId())
  }
}
