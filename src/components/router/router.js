const template = /*html*/ `
<div>
  <section path="/create" component="<city-creator></city-creator>"></section>
  <section path="/view" default component="<city-viewer></city-viewer>"></section>
  <div id="route-content"></div>
</div>
`

class RouterElement extends HTMLElement {
  constructor() {
    super()
    this.initListeners()
  }
  get routePlaceholder() {
    return this.querySelector('#route-content')
  }

  get defaultRoute() {
    return this.querySelector('section[default]')
  }

  initListeners() {
    document.addEventListener('router-change', evt => {
      console.log(evt.detail)

      if (evt.detail.url) {
        const component = this.querySelector(
          `section[path="${evt.detail.url}"]`,
        ).getAttribute('component')
        console.log(component)
        this.processRoute(component)
      }
    })
  }

  init() {
    this.processRoute(this.defaultRoute.getAttribute('component'))
  }

  processRoute(component) {
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

customElements.define('metric-router', RouterElement)
