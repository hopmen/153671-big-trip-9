import TripInfo from "./components/trip-info";
import Menu from "./components/menu";
import Filter from "./components/filter";
import cards from "./mocks/card.js";
import TripController from './controllers/trip.js';
import {Position, render} from "./utils.js";

const tripInfoContainer = document.querySelector(`.trip-info`);
const navHeader = document.querySelector(`.trip-controls h2:first-child`);
const filterHeader = document.querySelector(`.trip-controls h2:last-child`);
const mainContainer = document.querySelector(`.trip-events`);

const tripInfo = new TripInfo(cards);
const menu = new Menu();
const filter = new Filter();
const tripController = new TripController(mainContainer, cards);

render(navHeader, menu.getElement(), Position.AFTER);
render(filterHeader, filter.getElement(), Position.AFTER);
render(tripInfoContainer, tripInfo.getElement(), Position.AFTERBEGIN);
tripController.init();
