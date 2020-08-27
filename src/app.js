import template from './app.html'

class App extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template
  }
}

customElements.define('metric-app', App)
