import Sorting from "../components/sorting.js";
import Day from "../components/day.js";
import DayList from "../components/day-list.js";
import CardController from "../controllers/card.js";
import {Position, render, unrender} from "../utils.js";

export default class TripController {
  constructor(container, cards) {
    this._container = container;
    this._cards = cards;
    this._dayList = new DayList();
    this._sorting = new Sorting();
    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    if (this._cards.length) {
      render(this._container, this._sorting.getElement(), Position.BEFOREEND);
      this._renderDayList(this._cards);
    } else {
      this._renderEmptyMessage();
    }
    this._getTotalSum(this._cards);
    this._sorting.getElement().addEventListener(`click`, (evt) => this._onSortClick(evt));
  }

  _renderDayList(cards) {
    this._clearDayList();

    render(this._container, this._dayList.getElement(), Position.BEFOREEND);
    document.querySelector(`#sort-day`).classList.remove(`visually-hidden`);


    const cardEventsByDate = cards.reduce((day, card) => {
      if (day[card.startTime]) {
        day[card.startTime].push(card);
      } else {
        day[card.startTime] = [card];
      }

      return day;
    }, {});

    Object.entries(cardEventsByDate).forEach(([date, cardsItems]) => {
      const sortedByStartTimeCards = cardsItems.slice().sort((a, b) => b.startTime - a.startTime);
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
    const cardController = new CardController(container, cardMock, this._onDataChange, this._onChangeView);
    this._subscriptions.push(cardController.setDefaultView.bind(cardController));
  }

  _onDataChange(newData, oldData) {
    this._cards[this._cards.findIndex((it) => it === oldData)] = newData;
    this._renderDayList(this._cards);
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
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
        this._renderDayList(this._cards);
        break;
    }
  }

  _getTotalSum(cardsItems) {
    const sumMain = cardsItems.map(({price}) => price).reduce((sum, current) => {
      return sum + current;
    }, 0);
    const allOffers = cardsItems.map(({type}) => type.offers);
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

  _clearDayList() {
    unrender(this._dayList.getElement());
    this._dayList.removeElement();
  }
}
