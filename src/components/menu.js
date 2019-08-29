import {createElement} from "../utils";

export class TripControls {
  constructor(data) {
    this._data = data;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `
      <nav class="trip-controls__trip-tabs  trip-tabs">
        ${this._data.length > 0 ? this._data.map((i) => `<a class="trip-tabs__btn ${i.isActive ? `trip-tabs__btn--active` : ``}" href="#">${i.title}</a>`).join(``) : ``}
      </nav>
    `;
  }
}
