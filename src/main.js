import Menu from "./components/menu.js";
import TripController from "./controllers/trip.js";
import TripInfoController from "./controllers/trip-info.js";
import StatisticsController from "./controllers/statistics.js";
import FilterController from "./controllers/filter.js";
import {Position, Action, render} from "./utils.js";
import API from "./api.js";
import ModelCard from "./models/model-card.js";

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/big-trip`;
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const tripInfoContainer = document.querySelector(`.trip-info`);
const navHeader = document.querySelector(`.trip-controls h2:first-child`);
const filterHeader = document.querySelector(`.trip-controls h2:last-child`);
const tripContainer = document.querySelector(`.trip-events`);
const mainContainer = document.querySelector(`.page-main .page-body__container`);
const addCardBtn = document.querySelector(`.trip-main__event-add-btn`);

const updateData = (cards) => {
  tripInfoController.updateData(cards);
  filterController.updateData(cards);
  tripController.show(cards);
  statisticsController.updateData(cards);
};

const onDataChange = (actionType, cards) => {
  switch (actionType) {
    case Action.UPDATE:
      api.updateCard({
        id: cards.id,
        data: ModelCard.toRAW(cards)
      })
        .then(() => api.getCards())
        .then((data) => updateData(data));
      break;
    case Action.DELETE:
      api.deleteCard({
        id: cards.id
      })
        .then(() => api.getCards())
        .then((data) => updateData(data));
      break;
    case Action.CREATE:
      api.createCard({
        data: ModelCard.toRAW(cards)
      })
        .then(() => api.getCards())
        .then((data) => updateData(data));
      break;
  }
};

const onFilterSwitch = (cardsItems) => {
  tripController.onFilterSwitch(cardsItems);
  tripController.show();
  setTableActive();
};
const setTableActive = () => {
  statisticsController.hide();
  menu.getElement().querySelector(`#table`).classList.add(`trip-tabs__btn--active`);
  menu.getElement().querySelector(`#stats`).classList.remove(`trip-tabs__btn--active`);
};

let allDestinations;
let allOffers;

const menu = new Menu();
const statisticsController = new StatisticsController(mainContainer);
const filterController = new FilterController(filterHeader, onFilterSwitch);
const tripInfoController = new TripInfoController(tripInfoContainer);
const tripController = new TripController(tripContainer, onDataChange);

render(navHeader, menu.getElement(), Position.AFTER);
statisticsController.hide();

menu.getElement().addEventListener(`click`, (evt) => {
  evt.preventDefault();

  const tableId = `table`;
  const statisticId = `stats`;

  switch (evt.target.id) {
    case tableId:
      statisticsController.hide();
      tripController.show();
      menu.getElement().querySelector(`#${tableId}`).classList.add(`trip-tabs__btn--active`);
      menu.getElement().querySelector(`#${statisticId}`).classList.remove(`trip-tabs__btn--active`);
      break;
    case statisticId:
      tripController.hide();
      statisticsController.show();
      menu.getElement().querySelector(`#${tableId}`).classList.remove(`trip-tabs__btn--active`);
      menu.getElement().querySelector(`#${statisticId}`).classList.add(`trip-tabs__btn--active`);
      break;
  }
});

addCardBtn.addEventListener(`click`, () => {
  tripController.show();
  setTableActive();
});

api.getCities().then((cities) => {
  allDestinations = cities;

  api.getOffers().then((offers) => {
    allOffers = offers;

    api.getCards().then((cards) => {
      tripInfoController.create(cards);
      filterController.create(cards);
      tripController.show(cards);
      statisticsController.create(cards);
    });
  });
});


export {allDestinations, allOffers};
