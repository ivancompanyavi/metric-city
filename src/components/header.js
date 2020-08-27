import template from './header.html'
class Header extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = template
  }
}
customElements.define('metric-header', Header)
