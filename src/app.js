const template = `
<style>
  metric-app {
    display: grid;
    grid-template-areas:
      'header header'
      'nav content';
    grid-template-rows: 60px 1fr;
    grid-template-columns: 100px 1fr;
    background-color: var(--color-grey-darker);
    overflow-x: hidden;
    height: 100vh;
  }
</style>
<metric-header></metric-header>
<metric-nav></metric-nav>
<metric-router></metric-router>
`

class App extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template
  }
}

customElements.define('metric-app', App)
