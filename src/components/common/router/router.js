const template = /*html*/ `
<div>
  <section path="/create" component="<city-creator></city-creator>"></section>
  <section path="/view" default component="<city-view></city-view>"></section>
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

  getStringComponent(url) {
    const section =
      this.querySelector(`section[path="${url}"]`) || this.defaultRoute
    return section.getAttribute('component')
  }

  initListeners() {
    document.addEventListener('router-change', evt => {
      if (evt.detail.url) {
        const component = this.getStringComponent(evt.detail.url)
        this.processRoute(component)
      }
    })
  }

  init() {
    const url = new URL(location.href)
    this.processRoute(this.getStringComponent(url.pathname))
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
