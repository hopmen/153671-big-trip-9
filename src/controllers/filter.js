import Filter from "../components/filter.js";
import {Position, render} from "../utils.js";
import moment from 'moment';

export default class FilterController {
  constructor(container, onFilterSwitch) {
    this._container = container;
    this._cards = [];
    this._filter = new Filter();
    this._onFilterSwitch = onFilterSwitch;
  }

  create(cards) {
    this._cards = cards;
    this._filter.getElement().querySelectorAll(`.trip-filters__filter-input`).forEach((element) => element.addEventListener(`click`, this._onFilterClick.bind(this)));
    this._checkAvailability();

    render(this._container, this._filter.getElement(), Position.AFTER);
  }

  updateData(cards) {
    this._cards = cards;
    this._filter.getElement().querySelector(`#filter-everything`).checked = true;
    this._checkAvailability();
  }

  _checkAvailability() {
    this._filter.getElement().querySelectorAll(`.trip-filters__filter-input`).forEach((element) => this._getFilter(element));
  }

  _getFilter(element) {
    const disableFilter = (cards, filter) => {
      filter.disabled = cards.length === 0;
    };
    let newCards = [];
    switch (element.value) {
      case `everything`:
        newCards = this._cards;
        disableFilter(newCards, element);
        break;
      case `future`:
        newCards = this._cards.filter(({startTime}) => moment(startTime).isAfter(moment(), `day`));
        disableFilter(newCards, element);
        break;
      case `past`:
        newCards = this._cards.filter(({endTime}) => moment(endTime).isBefore(moment(), `day`));
        disableFilter(newCards, element);
        break;
    }

    return newCards;
  }

  _onFilterClick(evt) {
    const newCards = this._getFilter(evt.target);
    this._onFilterSwitch(newCards);
  }
}
