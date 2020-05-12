import { router } from './utils.js'
const template = `
  <style>
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 12px;
    color: var(--color-grey-lighter);
  }

  a:hover {
    font-weight: bold;
  }

  a[selected="true"] {
    background-color: var(--color-grey-lighter);
    color: var(--color-white);
  }
  </style>

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
