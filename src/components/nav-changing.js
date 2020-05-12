import { router } from './router/index.js'

const template = `<style>
  metric-nav {
    grid-area: nav;
    background-color: var(--color-grey);
  }
  nav {
    border-bottom: 1px solid black;
    height: 100%;
  }
  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style-type: none;
    height: 80px;
    text-align: center;
  }

  li:hover {
    cursor: pointer;
  }

  li:hover i {
    color: var(--color-white);
  }

  metric-route-link[selected="true"] i {
    color: var(--color-white);
  }
  i {
    color: var(--color-grey-lighter);
    margin-bottom: 10px;
  }
</style>
<nav>
  <ul>
    <li>
      <metric-route-link path="/view">
        <i class="material-icons">map</i>
        view
      </metric-route-link>
    </li>
    <li>
      <metric-route-link path="/create">
        <i class="material-icons">edit</i>
        edit
      </metric-route-link>
    </li>
  </ul>
</nav>
`
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
