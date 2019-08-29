import {TripInfo} from "./components/trip-info";
import {TripControls} from "./components/menu";
import {TripFilters} from "./components/filter";
import {cityEvent} from "./data/event";
import {dataMenu} from "./data/menu";
import {render} from "./utils";
import {dataFilters} from "./data/filters";

/*const renderEvents = (containers, template, data, place = `beforeend`) => {
  containers.forEach((container) => {
    data.forEach((i) => container.insertAdjacentHTML(place, template(i)));
  });
};*/
const renderMenu = (data) => {
  const tripControls = new TripControls(data);
  render(tripControlsHeadings[0], tripControls.getTemplate(), `afterend`);
};
const renderFilers = (data) => {
  const tripFilters = new TripFilters(data);
  render(tripControlsHeadings[1], tripFilters.getTemplate(), `afterend`);
};/*
const renderEventList = (container, template, data, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template(data));
};*/
const renderTripInfo = (data) => {
  const tripInfo = new TripInfo(data);
  render(tripInfoSection, tripInfo.getTemplate(), `afterbegin`);
};

/*const renderEventEdit = (container, template, data, place = `afterbegin`) => {
  container.insertAdjacentHTML(place, template(data));
};
const pushCostSumm = (element, data) => {
  element.innerHTML = data.reduce((value, currentItem) => {
    return value + currentItem.price;
  }, 0);
};*/

const tripInfoSection = document.querySelector(`section.trip-main__trip-info`);
const tripControlsHeadings = document.querySelectorAll(`.trip-main__trip-controls h2`);
const tripEventsSection = document.querySelector(`section.trip-events`);
const costValueElement = document.querySelector(`.trip-info__cost-value`);
const eventListTempContainer = document.createElement(`div`);

renderTripInfo(cityEvent);
renderMenu(dataMenu);
renderFilers(dataFilters);/*
renderEventList(eventListTempContainer, EventList, dateEvent);
const tripEventsList = eventListTempContainer.querySelectorAll(`.trip-events__list`);
renderEventEdit(tripEventsList[0], EventEdit, events[0]);
renderEvents(tripEventsList, Event, events);
render(tripEventsSection, getTripSort() + eventListTempContainer.innerHTML);
pushCostSumm(costValueElement, events);
*/
