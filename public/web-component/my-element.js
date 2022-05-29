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

  static properties = {
    name: { type: String },
    bookAmount: { type: Number },
    _star: { state: false },
    data: { type: Array },
  };

  constructor() {
    super();
    this._star = false;
    this.data = [
      {
        name: "Bryan Cranston",
        bookAmount: 2,
        starSetting: false,
      },
      {
        name: "Aaron Paul",
        bookAmount: 62,
        starSetting: false,
      },
      {
        name: "Bob Odenkirk",
        bookAmount: 0,
        starSetting: false,
      },
    ];
  }

  onOffStar(objectData, index) {
    console.log("index", objectData);

    // return html`<a
    //   id="${this.name}"
    //   @click=${this._handleStarClick}
    //   class="mdl-list__item-secondary-action"
    //   href="#"
    // >
    //   <i class="material-icons"
    //     >${objectData.starSetting === false ? "star_border" : "star"}</i
    //   >
    // </a>`;

    // const thing = document
    //   ?.querySelector(`#${objectData.name}`)
    //   ?.addEventListener("click", (e) => {
    //     this.data[index].starSetting = true;
    //   });

    // this.addEventListener("click", (e) => {
    //   console.log("stuff", e);
    // });

    if (objectData.starSetting === false) {
      this.data[index].starSetting = true;
      return html`<a
        id="${objectData.name}"
        class="mdl-list__item-secondary-action"
        href="#"
      >
        <i class="material-icons">star_border</i>
      </a>`;
    } else if (objectData.starSetting === true) {
      this.data[index].starSetting = false;
      return html`<a
        id="${objectData.name}"
        class="mdl-list__item-secondary-action"
        href="#"
      >
        <i class="material-icons">star</i>
      </a>`;
    }
  }

  listItem() {
    // let data = [
    //   {
    //     name: "thing",
    //     bookAmount: 1,
    //   },
    //   {
    //     name: "thing",
    //     bookAmount: 1,
    //   },
    // ];

    console.log("thingssssssssssss", this.data);

    let data = this?.data;
    const mappedData = data?.map((data, index) => {
      return html` <li class="mdl-list__item mdl-list__item--two-line">
        <span class="mdl-list__item-primary-content">
          <i class="material-icons mdl-list__item-avatar">person</i>
          <span>${data.name}</span>
          <span class="mdl-list__item-sub-title">${data.bookAmount} Books</span>
        </span>
        <span class="mdl-list__item-secondary-content">
          ${this.onOffStar(data, index)}
        </span>
      </li>`;
    });
    return mappedData;
  }

  set value(value) {
    const oldValue = this.value;
    this._value = value;
    this.requestUpdate("value", oldValue);
  }

  get value() {
    return this._value;
  }

  onChange(e) {
    this.value = e.target.value;
  }

  set data(data) {
    let oldData = this.data;
    this._data = data;
    this.requestUpdate("data", oldData);
  }

  get data() {
    return this._data;
  }

  _handleClick(e) {
    let oldData = this.data;
    let newData = {
      name: this._value,
      bookAmount: 1,
      starSetting: false,
    };
    this.data = [...oldData, newData];
    console.log(newData, oldData, updatedData);
    // this.requestUpdate("data", updatedData);
  }

  nameInput() {
    return html` <div
        class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
      >
        <input
          class="mdl-textfield__input"
          type="text"
          id="sample3"
          value=${this.value}
          @change=${this.onChange}
        />
        <label class="mdl-textfield__label" for="sample3">Name</label>
      </div>
      <button
        class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
        @click=${this._handleClick}
      >
        <i class="material-icons">add</i>
      </button>`;
  }

  render() {
    return html`
      <body>
        <div class="container">
          <ul class="demo-list-two mdl-list">
            ${this.listItem()}
          </ul>
          ${this.nameInput()}
        </div>
      </body>
    `;
  }

  createRenderRoot() {
    //  Don't use shadow dom
    return this;
  }
}

customElements.define("my-element", MyElement);
