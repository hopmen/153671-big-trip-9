import Sorting from "../components/sorting.js";
import Card from "../components/card.js";
import CardEdit from "../components/card-edit.js";
import Day from "../components/day.js";
import DayList from "../components/day-list.js";
import {Position, KeyCode, render} from "../utils.js";

export default class TripController {
  constructor(container, cards) {
    this._container = container;
    this._cards = cards;
    this._dayList = new DayList();
    this._sorting = new Sorting();
  }

  init() {
    if (this._cards.length) {
      this._renderContent();
    } else {
      this._renderEmptyMessage();
    }
    this._getTotalSum(this._cards);
    this._sorting.getElement().addEventListener(`click`, (evt) => this._onSortClick(evt));
  }

  _renderContent() {
    render(this._container, this._sorting.getElement(), Position.BEFOREEND);
    render(this._container, this._dayList.getElement(), Position.BEFOREEND);
    this._renderDayList();
  }

  _renderDayList() {
    document.querySelector(`#sort-day`).classList.remove(`visually-hidden`);
    const cardEventsByDate = this._cards.reduce((day, card) => {
      if (day[card.startTime]) {
        day[card.startTime].push(card);
      } else {
        day[card.startTime] = [card];
      }

      return day;
    }, {});

    Object.entries(cardEventsByDate).forEach(([date, cards]) => {
      const sortedByStartTimeCards = cards.slice().sort((a, b) => a.startTime - b.startTime);
      this._renderCardList(sortedByStartTimeCards, date);
    });
  }

  _renderCardList(cards, date) {
    const day = new Day(cards, date);

    cards.forEach((card, i) => {
      const cardContainer = day.getElement().querySelectorAll(`.trip-events__item`)[i];
      this._renderCard(cardContainer, card);
    });

    render(this._dayList.getElement(), day.getElement(), Position.BEFOREEND);
  }

  _renderCard(container, cardMock) {
    const card = new Card(cardMock);
    const cardEdit = new CardEdit(cardMock);
    const onEscKeyDown = (evt) => {
      if (evt.key === KeyCode.ESCAPE || evt.key === KeyCode.ESC) {
        container.replaceChild(card.getElement(), cardEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    card.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        container.replaceChild(cardEdit.getElement(), card.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    cardEdit.getElement()
      .addEventListener(`submit`, () => {
        container.replaceChild(card.getElement(), cardEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(container, card.getElement(), Position.BEFOREEND);
  }

  _onSortClick(evt) {
    if (evt.target.tagName !== `LABEL`) {
      return;
    }

    this._dayList.getElement().innerHTML = ``;
    document.querySelector(`#sort-day`).classList.add(`visually-hidden`);

    switch (evt.target.dataset.sortType) {
      case `time`:
        const sortedByTimeCards = this._cards.slice().sort((a, b) => a.startTime - b.startTime);
        this._renderCardList(sortedByTimeCards);
        break;
      case `price`:
        const sortedByPriceCards = this._cards.slice().sort((a, b) => a.price - b.price);
        this._renderCardList(sortedByPriceCards);
        break;
      case `default`:
        this._renderDayList();
        break;
    }
  }

  _getTotalSum(cardsItems) {
    const sumMain = cardsItems.map(({price}) => price).reduce((sum, current) => {
      return sum + current;
    }, 0);
    const allOffers = cardsItems.map(({offers}) => Array.from(offers));
    const appliedOffers = allOffers.map((item) => item.filter(({isApplied}) => isApplied));
    const offersPrices = appliedOffers.map((items) => items.map((item) => item.price));
    const offersPricesTotals = offersPrices.map((prices) => prices.reduce((sum, current) => {
      return sum + current;
    }, 0));
    const sumAdd = offersPricesTotals.reduce((sum, current) => {
      return sum + current;
    }, 0);
    const result = sumMain + sumAdd;
    const costContainer = document.querySelector(`.trip-info__cost-value`);
    costContainer.innerHTML = result;
  }

  _renderEmptyMessage() {
    this._container.insertAdjacentHTML(`beforeend`, `<p class="trip-events__msg">Click New Event to create your first point</p>`);
  }
}
