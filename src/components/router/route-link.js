import { router } from './utils.js'
const template = `
  <a>
    <slot></slot>
  </a>
`

class Route extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = template
    const path = this.getAttribute('path')
    this.shadowRoot.querySelector('a').addEventListener('click', () => {
      router.push({}, '', path)
    })
  }
}

customElements.define('metric-route-link', Route)
