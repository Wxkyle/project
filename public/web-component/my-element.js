import {
  LitElement,
  css,
  html,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2.2.1/core/lit-core.min.js";

export class MyElement extends LitElement {
  static styles = css`
    div {
      background: black;
    }
    // Since we are not using the shadow dom, styles set here will not work.
  `;

  render() {
    return html` <div>Hello World!</div> `;
  }

  createRenderRoot() {
    //  Don't use shadow dom
    return this;
  }
}

customElements.define("my-element", MyElement);
