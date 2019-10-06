import Sorting from "../components/sorting.js";
import Day from "../components/day.js";
import DayList from "../components/day-list.js";
import CardController from "../controllers/card.js";
import {Position, Mode, render, unrender} from "../utils.js";
import moment from 'moment';

export default class TripController {
  constructor(container) {
    this._container = container;
    this._cards = [];
    this._dayList = new DayList();
    this._sorting = new Sorting();
    this._subscriptions = [];
    this._creatingCard = null;
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._addCardBtn = document.querySelector(`.trip-main__event-add-btn`);

    this._addCardBtn.addEventListener(`click`, () => {
      this._createCard();
    });
  }

  hide() {
    this._container.classList.add(`visually-hidden`);
  }

  show(cards) {
    if (cards && cards !== this._cards) {
      this._setCards(cards);
      this._container.classList.remove(`visually-hidden`);
    } else {
      this._container.classList.remove(`visually-hidden`);
    }
  }

  _setCards(cards) {
    this._cards = cards;
    this._subscriptions = [];
    this._container.innerHTML = ``;
    this._addCardBtn.removeAttribute(`disabled`);
    this._clearDayList();
    if (this._cards.length) {
      render(this._container, this._sorting.getElement(), Position.BEFOREEND);
      this._renderDayList(this._cards);
    } else {
      this._renderEmptyMessage();
    }
    this._getTotalSum(this._cards);
    this._sorting.getElement().addEventListener(`click`, (evt) => this._onSortClick(evt));
  }

  _createCard() {
    const defaultCard = {
      type: {
        id: `flight`,
        title: `Flight`,
        placeholder: `to`,
      },
      city: {},
      startTime: moment().format(),
      endTime: moment().format(),
      price: ``,
    };

    const cardContainer = document.createElement(`div`);
    render(this._sorting.getElement(), cardContainer, Position.AFTER);

    this._creatingCard = new CardController(cardContainer, defaultCard, Mode.ADDING, this._onDataChange, this._onChangeView);
    this._onChangeView();
    this._addCardBtn.setAttribute(`disabled`, `disabled`);
  }

  _renderDayList(cards) {
    render(this._container, this._dayList.getElement(), Position.BEFOREEND);
    document.querySelector(`#sort-day`).classList.remove(`visually-hidden`);


    const cardEventsByDate = cards.reduce((day, card) => {
      if (day[moment(card.startTime).format(`MM-DD-YYYY`)]) {
        day[moment(card.startTime).format(`MM-DD-YYYY`)].push(card);
      } else {
        day[moment(card.startTime).format(`MM-DD-YYYY`)] = [card];
      }

      return day;
    }, {});

    const cardEventsByDateSorted = Object.entries(cardEventsByDate).sort((a, b) => {
      if (moment(a[0]).isBefore(b[0])) {
        return -1;
      }
      if (moment(a[0]).isAfter(b[0])) {
        return 1;
      }
      return 0;
    });

    cardEventsByDateSorted.forEach(([date, cardsItems]) => {
      const sortedByStartTimeCards = cardsItems.slice().sort((a, b) => {
        if (moment(a.startTime).isBefore(b.startTime)) {
          return -1;
        }
        if (moment(a.startTime).isAfter(b.startTime)) {
          return 1;
        }
        return 0;
      });
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
    const cardController = new CardController(container, cardMock, Mode.DEFAULT, this._onDataChange, this._onChangeView);
    this._subscriptions.push(cardController.setDefaultView.bind(cardController));
  }

  _onDataChange(newData, oldData) {
    const index = this._cards.findIndex((card) => card === oldData);

    if (newData === null) {
      this._cards = [...this._cards.slice(0, index), ...this._cards.slice(index + 1)];
    } else if (oldData === null) {
      this._cards = [newData, ...this._cards];
    } else {
      this._cards[index] = newData;
    }

    this._setCards(this._cards);
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
        const sortedByTimeCards = this._cards.slice().sort((a, b) => {
          if (moment(a.startTime).isBefore(b.startTime)) {
            return -1;
          }
          if (moment(a.startTime).isAfter(b.startTime)) {
            return 1;
          }
          return 0;
        });
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
