import AbstractComponent from '../components/absctract-component.js';
import moment from 'moment';

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
          <span class="day__counter">${moment(this._date).format(`D`)}</span>
          <time class="day__date" datetime="${moment(this._date).format(`YYYY-MM-DD`)}">
            ${moment(this._date).format(`MMM`)}
          </time>` : ``}
        </div>
        <ul class="trip-events__list">
          ${this._cards.map(() => `<li class="trip-events__item"></li>`).join(``)}
        </ul>
      </li>
    `.trim();
  }
}
