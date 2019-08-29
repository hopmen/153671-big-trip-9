import {TripInfo} from "./components/trip-info";
import {TripControls} from "./components/menu";
import {cityEvent} from "./data/event";
import {dataMenu} from "./data/menu";
import {render} from "./utils";


/*const renderEvents = (containers, template, data, place = `beforeend`) => {
  containers.forEach((container) => {
    data.forEach((i) => container.insertAdjacentHTML(place, template(i)));
  });
};*/
const renderMenu = (data) => {
  const tripControls = new TripControls(data);
  render(tripControlsHeadings[0], tripControls, `afterend`);
};/*
const renderFilers = (container, template, data, place = `afterend`) => {
  container.insertAdjacentHTML(place, template(data));
};
const renderEventList = (container, template, data, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template(data));
};*/
const renderTripInfo = (data) => {
  const tripInfo = new TripInfo(data);
  return (tripInfoSection, tripInfo.getElement(), `afterbegin`);
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
const tripControlsHeadings = document.querySelectorAll(`.trip-main__trip-controls h2`);/*
const tripEventsSection = document.querySelector(`section.trip-events`);
const costValueElement = document.querySelector(`.trip-info__cost-value`);
const eventListTempContainer = document.createElement(`div`);*/

renderTripInfo(cityEvent);
renderMenu(dataMenu);/*
renderFilers(tripControlsHeadings[1], TripFilters, dataFilters);
renderEventList(eventListTempContainer, EventList, dateEvent);
const tripEventsList = eventListTempContainer.querySelectorAll(`.trip-events__list`);
renderEventEdit(tripEventsList[0], EventEdit, events[0]);
renderEvents(tripEventsList, Event, events);
render(tripEventsSection, getTripSort() + eventListTempContainer.innerHTML);
pushCostSumm(costValueElement, events);
*/
