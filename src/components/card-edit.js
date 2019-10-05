import AbstractComponent from '../components/absctract-component.js';

export default class CardEdit extends AbstractComponent {
  constructor({type, city, startTime, endTime, price, offers, pictures, description}) {
    super();
    this._type = type;
    this._city = city;
    this._startTime = new Date(startTime);
    this._endTime = new Date(endTime);
    this._price = price;
    this._offers = offers;
    this._pictures = pictures;
    this._description = description;
  }

  getTime(time) {
    return `${time.getDate()}/${time.getMonth()}/${time.getYear()} ${time.getHours()}:${time.getMinutes()}`;
  }

  getTemplate() {
    return `
    <form class="event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${this._type.id}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        </div>
  
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${this._type.title} ${this._type.placeholder}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${this._city}" list="destination-list-1">
          <datalist id="destination-list-1"></datalist>
        </div>
  
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
           value="${this.getTime(this._startTime)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" 
          value="${this.getTime(this._endTime)}">
        </div>
  
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${this._price}">
        </div>
  
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
  
        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>
  
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
  
      <section class="event__details">
  
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  
          <div class="event__available-offers">
          ${Array.from(this._offers).map(({title, price: amount}) => `
            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
              <label class="event__offer-label" for="event-offer-luggage-1">
                <span class="event__offer-title">${title}</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">${amount}</span>
              </label>
            </div>`).join(``)}
          </div>
        </section>
  
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${this._description.join(``)}</p>
  
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${this._pictures.map((url) => `<img class="event__photo" src="${url}" alt="Event photo">`).join(``)}
            </div>
          </div>
        </section>
      </section>
    </form>`.trim();
  }
}
