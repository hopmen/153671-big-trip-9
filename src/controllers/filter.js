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

    this._filter.getElement().querySelectorAll(`.trip-filters__filter-label`).forEach((element) => {
      element.addEventListener(`click`, (evt) => {
        const newCards = this._onClickFilter(evt);
        this._onFilterSwitch(newCards);
      });
    });

    render(this._container, this._filter.getElement(), Position.AFTER);
  }

  updateData(cards) {
    this._cards = cards;
    this._filter.getElement().querySelector(`#filter-everything`).checked = true;
  }

  _onClickFilter(evt) {
    const id = evt.target.getAttribute(`for`);
    let newCards = [];
    switch (id) {
      case `filter-everything`:
        newCards = this._cards;
        break;
      case `filter-future`:
        newCards = this._cards.filter(({
          startTime
        }) => moment(startTime).isAfter(moment(), `day`));
        break;
      case `filter-past`:
        newCards = this._cards.filter(({
          endTime
        }) => moment(endTime).isBefore(moment(), `day`));
        break;
    }

    return newCards;
  }
}
