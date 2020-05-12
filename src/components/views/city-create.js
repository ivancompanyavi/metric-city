const template = `
  <metric-content>
  <metric-city
    data-width="100"
    data-height="50"
    data-rows="2"
    data-columns="2"
  >
  <metric-layer id="map">
    <metric-tile-map data-x="0" data-y="0" data-color="red" />
  </metric-layer>
  </metric-city>
  </metric-content>
<metric-config-bar></metric-config-bar>
`

class CityCreate extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template
  }
}

customElements.define('city-create', CityCreate)
