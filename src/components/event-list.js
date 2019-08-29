import {createElement} from "../utils";

export class EventList {
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
  <ul class="trip-days">
      ${this._data.map((elem) => `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${this._data.indexOf(elem) + 1}</span>
        <time class="day__date" datetime="${new Date(elem).toLocaleString()}">${new Date(elem).getMonth()} ${new Date(elem).getDate()}</time>
      </div>

      <ul class="trip-events__list">
      </ul>
    </li>`).join(``)}
  </ul>`;
  }
}
