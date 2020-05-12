const template = /*html*/ `
<style>
  * {
    color: var(--color-white);
  }
:host {
  display: grid;
  grid-area: content;
  position: relative;
}
</style>
<slot></slot>
`

class Content extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = template
  }
}

customElements.define('metric-content', Content)
