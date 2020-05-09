const template = /*html*/ `
<div>
  <section component="<city-creator></city-creator>"></section>
  <section default component="<city-viewer></city-viewer>"></section>
  <div id="route-content"></div>
</div>
`

class Router extends HTMLElement {
  get routePlaceholder() {
    return this.querySelector('#route-content')
  }

  get defaultRoute() {
    return this.querySelector('section[default]')
  }

  init() {
    this.processRoute(this.defaultRoute.getAttribute('component'))
  }

  processRoute(component) {
    console.log(component)
    const domComponent = this.getDOMComponent(component)
    this.clearPreviousRoute()
    this.routePlaceholder.appendChild(domComponent)
  }

  clearPreviousRoute() {
    while (this.routePlaceholder.firstChild) {
      this.routePlaceholder.removeChild(this.routePlaceholder.firstChild)
    }
  }

  getDOMComponent(component) {
    return new DOMParser().parseFromString(component, 'text/html').body
      .firstChild
  }

  connectedCallback() {
    this.innerHTML = template
    this.init()
  }
}

customElements.define('metric-router', Router)
