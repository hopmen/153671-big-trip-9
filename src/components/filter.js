import {createElement} from "../utils";

export class TripFilters {
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
      <form class="trip-filters" action="#" method="get">
        ${this._data.map((filter) => `
        <div class="trip-filters__filter">
            <input id="filter-${filter.title.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.title.toLowerCase()}" ${filter.isChecked ? `checked` : ``}>
            <label class="trip-filters__filter-label" for="filter-${filter.title.toLowerCase()}">${filter.title}</label>
        </div>`).join(``)}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    `;
  }
}
