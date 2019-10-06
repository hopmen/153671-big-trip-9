import {monthNames} from '../utils.js';
import AbstractComponent from '../components/absctract-component.js';

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
          ${monthNames[new Date(this._cards[0].startTime).getMonth()]} ${new Date(this._cards[0].startTime).getDate()}
          &nbsp;&mdash;&nbsp;
          ${monthNames[new Date(this._cards[this._cards.length - 1].endTime).getMonth()]} ${new Date(this._cards[this._cards.length - 1].endTime).getDate()}` : ``}
        </p>
      </div>`.trim();
  }
}
