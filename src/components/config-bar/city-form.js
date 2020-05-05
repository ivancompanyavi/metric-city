const template = /*html*/ `
<style>
    metric-element-form {
        display: none;
    }
    metric-element-form.shown {
      display: block;
    }
    .fieldset {
      display: flex;
      border: 1px solid var(--color-silver);
      border-radius: 5px;
      color: var(--color-silver);
      margin-bottom: 15px;
      padding: 10px;
    }
    input {
      border: 0;
      flex: 1;
      background-color: var(--color-grey);
      color: var(--color-silver);
    }
    label {
      flex: 0;
    }
    h3 {
      padding: 0 20px 20px 20px;
      margin: 0;
      border-bottom: 1px solid var(--color-silver);
      margin-bottom: 20px;
    }
</style>
<h3>Element settings</h3>
<form></form>
`

const inputTpl = (key, value) => /*html*/ `
  <div class="fieldset">
    <input type="text" name="${key}" value="${value}" />
    <label for="${key}">${key}<label>
  </div>
`

class CityForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template
  }
}

customElements.define('metric-city-form', CityForm)
