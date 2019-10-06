import AbstractComponent from '../components/absctract-component.js';
import {monthNames} from '../utils.js';

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
          <span class="day__counter">${new Date(+this._date).getDate()}</span>
          <time class="day__date" datetime="${new Date(this._date)}">
            ${monthNames[new Date(+this._date).getMonth()]}
          </time>` : ``}
        </div>
        <ul class="trip-events__list">
          ${this._cards.map(() => `<li class="trip-events__item"></li>`).join(``)}
        </ul>
      </li>
    `.trim();
  }
}
