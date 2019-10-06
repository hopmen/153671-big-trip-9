import TripInfo from "./components/trip-info.js";
import Menu from "./components/menu.js";
import Filter from "./components/filter.js";
import Statistics from "./components/statistics.js";
import {cards} from "./mocks/card.js";
import TripController from "./controllers/trip.js";
import {Position, render} from "./utils.js";

const tripInfoContainer = document.querySelector(`.trip-info`);
const navHeader = document.querySelector(`.trip-controls h2:first-child`);
const filterHeader = document.querySelector(`.trip-controls h2:last-child`);
const tripContainer = document.querySelector(`.trip-events`);
const mainContainer = document.querySelector(`.page-main .page-body__container`);

const tripInfo = new TripInfo(cards);
const menu = new Menu();
const filter = new Filter();
const statistics = new Statistics();
const tripController = new TripController(tripContainer);

render(navHeader, menu.getElement(), Position.AFTER);
render(filterHeader, filter.getElement(), Position.AFTER);
render(tripInfoContainer, tripInfo.getElement(), Position.AFTERBEGIN);
render(mainContainer, statistics.getElement(), Position.BEFOREEND);
statistics.getElement().classList.add(`visually-hidden`);
tripController.show(cards);

menu.getElement().addEventListener(`click`, (evt) => {
  evt.preventDefault();

  const tableId = `table`;
  const statisticId = `stats`;

  switch (evt.target.id) {
    case tableId:
      statistics.getElement().classList.add(`visually-hidden`);
      tripController.show();
      menu.getElement().querySelector(`#${tableId}`).classList.add(`trip-tabs__btn--active`);
      menu.getElement().querySelector(`#${statisticId}`).classList.remove(`trip-tabs__btn--active`);
      break;
    case statisticId:
      tripController.hide();
      statistics.getElement().classList.remove(`visually-hidden`);
      menu.getElement().querySelector(`#${tableId}`).classList.remove(`trip-tabs__btn--active`);
      menu.getElement().querySelector(`#${statisticId}`).classList.add(`trip-tabs__btn--active`);
      break;
  }
});
