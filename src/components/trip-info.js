import {createElement} from "../utils";

export class TripInfo {
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
      <div class="trip-info__main">
        <h1 class="trip-info__title">${this._data.length > 3 ? `${this._data.data[0]} &mdash; ... &mdash; ${this._data.data[this._data.length - 1]}` : `${this._data.join(` &mdash; `)}`}</h1> 
        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
      </div>`;
  }

}
