import Menu from "./components/menu.js";
import {cards} from "./mocks/card.js";
import TripController from "./controllers/trip.js";
import TripInfoController from "./controllers/trip-info.js";
import StatisticsController from "./controllers/statistics.js";
import FilterController from "./controllers/filter.js";
import {Position, render} from "./utils.js";

const tripInfoContainer = document.querySelector(`.trip-info`);
const navHeader = document.querySelector(`.trip-controls h2:first-child`);
const filterHeader = document.querySelector(`.trip-controls h2:last-child`);
const tripContainer = document.querySelector(`.trip-events`);
const mainContainer = document.querySelector(`.page-main .page-body__container`);
const addCardBtn = document.querySelector(`.trip-main__event-add-btn`);

const onDataChange = (newCards) => {
  cardMocks = newCards;
  filterController.updateData(cardMocks);
  tripInfoController.updateData(cardMocks);
};
const onFilterSwitch = (cardsItems) => {
  tripController.onFilterSwitch(cardsItems);
  tripController.show();
  setTableActive();
};
const menu = new Menu();
const statisticsController = new StatisticsController(mainContainer);
const tripController = new TripController(tripContainer, onDataChange);

let cardMocks = cards;

const filterController = new FilterController(filterHeader, cardMocks, onFilterSwitch);
const tripInfoController = new TripInfoController(tripInfoContainer, cardMocks);

const setTableActive = () => {
  statisticsController.hide();
  menu.getElement().querySelector(`#table`).classList.add(`trip-tabs__btn--active`);
  menu.getElement().querySelector(`#stats`).classList.remove(`trip-tabs__btn--active`);
};

render(navHeader, menu.getElement(), Position.AFTER);

statisticsController.hide();
tripController.show(cardMocks);

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
      statisticsController.show(cardMocks);
      menu.getElement().querySelector(`#${tableId}`).classList.remove(`trip-tabs__btn--active`);
      menu.getElement().querySelector(`#${statisticId}`).classList.add(`trip-tabs__btn--active`);
      break;
  }
});

addCardBtn.addEventListener(`click`, () => {
  tripController.show(cardMocks);
  setTableActive();
});
