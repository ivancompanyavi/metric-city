const map = `
<metric-content>
  <metric-layer id="map">
    <metric-tile-map data-x="0" data-y="0" data-color="red" />
  </metric-layer>
  <metric-layer id="buildings">
    <metric-house data-x="10" data-y="29" data-pct="0.4"></metric-house>
    <metric-text data-x="15" data-y="29" data-text="hello"></metric-text>
    <metric-road data-x="0" data-y="29" data-length="5"></metric-road>
    <metric-road
      data-x="0"
      data-y="39"
      data-length="5"
      data-direction="left"
    ></metric-road>
    <metric-fire-station
      data-x="18"
      data-y="8"
      data-length="5"
    ></metric-fire-station>
    <metric-hospital
      data-x="0"
      data-y="8"
      data-length="5"
    ></metric-hospital>
    <metric-park data-x="0" data-y="15" data-length="5"></metric-park>
  </metric-layer>
</metric-content>`
const template = `
<metric-city
  data-width="30"
  data-height="15"
  data-rows="50"
  data-columns="50"
>
  ${map}
</metric-city>
`

class CityView extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template
  }
}

customElements.define('city-view', CityView)