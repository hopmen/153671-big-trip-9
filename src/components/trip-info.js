import AbstractComponent from '../components/absctract-component.js';
import moment from 'moment';

export default class TripInfo extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards.slice().sort((a, b) => a.startTime - b.startTime);
  }

  getRouteTemplate(cards) {
    const cities = cards.map(({city}) => city.name);
    const count = cities.length;
    let result;
    switch (count) {
      case 2:
        result = `${cities[0]} &mdash; ${cities[1]}`;
        break;
      case 3:
        result = `${cities[0]} &mdash; ${cities[1]} &mdash; ${cities[2]}`;
        break;
      default:
        result = `${cities[0]} &mdash; ... &mdash; ${cities[cities.length - 1]}`;
    }
    return result;
  }

  getTemplate() {
    return `
      <div class="trip-info__main"> 
        <h1 class="trip-info__title">${this._cards.length ? `${this.getRouteTemplate(this._cards)}` : ``}</h1>
        <p class="trip-info__dates">
        ${this._cards.length ? `
          ${moment(this._cards[0].startTime).format(`MMM`)} ${moment(this._cards[0].startTime).format(`d`)}
          &nbsp;&mdash;&nbsp;
          ${moment(this._cards[this._cards.length - 1].endTime).format(`MMM`)} ${moment(this._cards[this._cards.length - 1].endTime).format(`d`)}` : ``}
        </p>
      </div>`.trim();
  }
}
