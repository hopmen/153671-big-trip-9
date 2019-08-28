import {createElement} from "../utils";

export class Event {
  constructor({title, startTime, endTime, price, typeIcon, options}) {
    this._title = title;
    this._startTime = startTime;
    this._endTime = endTime;
    this._typeIcon = typeIcon;
    this._price = price;
    this._options = options;
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
      <li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${this._typeIcon}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${this._title}</h3>
    
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${new Date(this._startTime).toLocaleString()}">${new Date(this._startTime).getHours()}H ${new Date(this._startTime).getMinutes()}M</time>
              &mdash;
              <time class="event__end-time" datetime="${new Date(this._endTime).toLocaleString()}">${new Date(this._endTime).getHours()}H ${new Date(this._endTime).getMinutes()}M</time>
            </p>
            <p class="event__duration">${new Date(this._endTime).getHours() - new Date(this._startTime).getHours()}H ${new Date(this._endTime).getMinutes() - new Date(this._startTime).getMinutes()}M</p>
          </div>
    
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${this._price}</span>
          </p>
          
          ${this._options.length > 0 ? `<h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
          
            ${this._options.filter((option) => option.isChecked === true)
      .map((option) => `
            <li class="event__offer">
              <span class="event__offer-title">${option.title}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${option.price}</span>
            </li>`).join(``)} 
            
          </ul>` : ``}
          
    
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`;
  }
}
