const template = `
<style>
hoot-content {
    grid-area: content;
}
</style>
`

class Content extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template
  }
}

customElements.define('hoot-content', Content)
