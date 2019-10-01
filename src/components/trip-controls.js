import {createElement} from "../utils";

export class TripControls {
  constructor(data) {
    this._data = data;
    this._element = null;
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
      <div>
        <h2 class="visually-hidden">Switch trip view</h2>
        <nav class="trip-controls__trip-tabs  trip-tabs">
          ${this._data.length > 0 ? this._data.map((i) => `<a class="trip-tabs__btn ${i.isActive ? `trip-tabs__btn--active` : ``}" href="#">${i.title}</a>`).join(``) : ``}
        </nav>
      </div>
    `;
  }
}
