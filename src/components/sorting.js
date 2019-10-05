import AbstractComponent from '../components/absctract-component.js';

export default class Sorting extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <span class="trip-sort__item  trip-sort__item--day"><span id="sort-day">Day</span></span>

        <div class="trip-sort__item  trip-sort__item--event">
          <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" checked>
          <label class="trip-sort__btn" for="sort-event" data-sort-type="default">Event</label>
        </div>

        <div class="trip-sort__item  trip-sort__item--time">
          <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
          <label class="trip-sort__btn  trip-sort__btn--active  trip-sort__btn--by-increase" for="sort-time" data-sort-type="time">
            Time
          </label>
        </div>

        <div class="trip-sort__item  trip-sort__item--price">
          <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
          <label class="trip-sort__btn" for="sort-price" data-sort-type="price">
            Price
          </label>
        </div>

        <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
      </form>
    `.trim();
  }
}
