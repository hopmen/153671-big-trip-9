import AbstractComponent from './abstract-component.js';
import {Months} from '../utils';

export default class Day extends AbstractComponent {
  constructor(cards, date) {
    super();
    this._date = date;
    this._cards = cards;
  }

  getTemplate() {
    return `
      <li class="trip-days__item  day">
        <div class="day__info">
          ${this._date !== undefined ? `
          <span class="day__counter">${new Date(this._date).getDay()}</span>
          <time class="day__date" datetime="${new Date(this._date).toISOString().substring(0, 10)}">
            ${Months[new Date(this._date).getMonth()]}
          </time>` : ``}
        </div>
        <ul class="trip-events__list">
          ${this._cards.map(() => `<li class="trip-events__item"></li>`).join(``)}
        </ul>
      </li>
    `.trim();
  }
}
