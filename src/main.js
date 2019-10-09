import Menu from "./components/menu.js";
import TripController from "./controllers/trip.js";
import TripInfoController from "./controllers/trip-info.js";
import StatisticsController from "./controllers/statistics.js";
import FilterController from "./controllers/filter.js";
import {Position, Action, ButtonText, render} from "./utils.js";
import API from "./api.js";
import Provider from "./provider.js";
import Store from "./store.js";
import ModelCard from "./models/model-card.js";

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/big-trip`;
const CARDS_STORE_KEY = `cards-store-key`;
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
const store = new Store({key: CARDS_STORE_KEY, storage: localStorage});
const provider = new Provider({api, store, generateId: () => String(Date.now() + Math.random())});

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

const onDataChange = (actionType, card, element) => {
  switch (actionType) {
    case Action.UPDATE:
      element.block();
      element.changeSubmitBtnText(ButtonText.SAVING);
      provider.updateCard({
        id: card.id,
        data: ModelCard.toRAW(card)
      })
        .then(() => provider.getCards())
        .then((data) => updateData(data))
        .catch(() => {
          element.shake();
          element.unblock();
          element.changeSubmitBtnText(ButtonText.SAVE);
        });
      break;
    case Action.DELETE:
      element.block();
      element.changeDeleteBtnText(ButtonText.DELETING);
      provider.deleteCard({
        id: card.id
      })
        .then(() => provider.getCards())
        .then((data) => updateData(data))
        .catch(() => {
          element.shake();
          element.unblock();
          element.changeDeleteBtnText(ButtonText.DELETE);
        });
      break;
    case Action.CREATE:
      element.block();
      element.changeSubmitBtnText(ButtonText.SAVING);
      provider.createCard({
        data: ModelCard.toRAW(card)
      })
        .then(() => provider.getCards())
        .then((data) => updateData(data))
        .catch(() => {
          element.shake();
          element.unblock();
          element.changeSubmitBtnText(ButtonText.SAVE);
        });
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

const menu = new Menu();
const statisticsController = new StatisticsController(mainContainer);
const filterController = new FilterController(filterHeader, onFilterSwitch);
const tripInfoController = new TripInfoController(tripInfoContainer);
const tripController = new TripController(tripContainer, onDataChange);
const loadingText = `Loading…`;

let allDestinations;
let allOffers;

render(navHeader, menu.getElement(), Position.AFTER);
statisticsController.hide();
tripContainer.innerHTML = loadingText;

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

provider.getCities().then((cities) => {
  allDestinations = cities;

  provider.getOffers().then((offers) => {
    allOffers = offers;

    provider.getCards().then((cards) => {
      tripInfoController.create(cards);
      filterController.create(cards);
      tripController.show(cards);
      statisticsController.create(cards);
    });
  });
});

window.addEventListener(`offline`, () => {
  document.title = `${document.title}[OFFLINE]`;
});
window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider.syncTasks();
});


export {allDestinations, allOffers};
