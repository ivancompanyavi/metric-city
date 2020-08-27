import template from './nav.html'

class Nav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template
    this.selectLink()
  }

  selectLink() {
    const url = new URL(window.location.href)
    this.querySelectorAll('metric-route-link').forEach(link => {
      if (link.getAttribute('path') === url.pathname) {
        link.setAttribute('selected', true)
      }
    })
  }
}

customElements.define('metric-nav', Nav)
