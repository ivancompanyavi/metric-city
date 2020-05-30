const template = /*html*/ `
<style>
    :host {
        grid-area: header;
        background-color: var(--color-black);
        color: var(--color-white);
    }
</style>
<head>
    <h2>Metric system<h2>
</head>
`
class Header extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = template
  }
}
customElements.define('metric-header', Header)
