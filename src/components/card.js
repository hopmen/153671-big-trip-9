import AbstractComponent from '../components/absctract-component.js';

export default class Card extends AbstractComponent {
  constructor({type, city, startTime, endTime, price}) {
    super();
    this._type = type;
    this._city = city.name;
    this._startTime = new Date(startTime);
    this._endTime = new Date(endTime);
    this._price = price;
    this._offers = this._type.offers;
  }

  getDuration(start, end) {
    let minutes = Math.abs(end.getMinutes() - start.getMinutes());
    let hours = Math.abs(end.getHours() - start.getHours());
    let days = Math.abs(end.getDate() - start.getDate());
    days = (days < 10) ? `0${days}` : days;
    hours = (hours < 10) ? `0${hours}` : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    return {
      days,
      hours,
      minutes
    };
  }

  getTemplate() {
    return `
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type.id}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${this._type.title} ${this._type.placeholder} ${this._city}</h3>
  
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${this._startTime.toISOString()}">
            ${this._startTime.getHours()}:${this._startTime.getMinutes()}
            </time>
            &mdash;
            <time class="event__end-time" datetime="${this._endTime.toISOString()}">
            ${this._endTime.getHours()}:${this._endTime.getMinutes()}
            </time>
          </p>
          <p class="event__duration">
          ${this.getDuration(this._endTime, this._startTime).days !== `00` ? `${this.getDuration(this._endTime, this._startTime).days}D` : ``}
          ${this.getDuration(this._endTime, this._startTime).hours !== `00` ? `${this.getDuration(this._endTime, this._startTime).hours}H` : ``}
          ${this.getDuration(this._endTime, this._startTime).minutes !== `00` ? `${this.getDuration(this._endTime, this._startTime).minutes}M` : ``}
          </p>
        </div>
  
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this._price}</span>
        </p>
  
        <h4 class="visually-hidden">Offers:</h4>
        ${this._offers.length ? `
          ${`<ul class="event__selected-offers">
              ${this._offers.filter(({isApplied}) => isApplied).map(({title, price: amount}, i) => i < 2 ? `
              <li class="event__offer">
                <span class="event__offer-title">${title}</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">${amount}</span>
              </li>
              ` : ``).join(``)}
            </ul>`}` : ``}
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    `.trim();
  }
}
