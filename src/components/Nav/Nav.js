const template = /*html*/ `
<style>
  hoot-nav {
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

  a {
    display: flex;
    flex-align: center;
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

  a[selected=true] {
    background-color: var(--color-grey-lighter);
    color: var(--color-white);
  }

  a[selected=true] i {
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
      <a href="/index.html">
        <i class="material-icons">map</i>
        view
      </a>
    </li>
    <li>
      <a href="/edit.html">
        <i class="material-icons">edit</i>
        edit
      </a>
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
    this.querySelectorAll('a').forEach(link => {
      if (link.getAttribute('href') === url.pathname) {
        link.setAttribute('selected', true)
      }
    })
  }
}

customElements.define('hoot-nav', Nav)
