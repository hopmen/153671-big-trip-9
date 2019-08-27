import {TripInfo} from "./components/trip-info";
import {TripControls} from "./components/menu";
import {TripFilters} from "./components/filter";
import {TripSort} from "./components/sort";
import {EventList} from "./components/event-list";
import {Event} from "./components/event";
import {EventEdit} from "./components/event-edit";
import {events} from "./data/event";
import {dataMenu} from "./data/menu";
import {dataFilters} from "./data/filters";


const render = (container, html, place = `beforeend`) => {
  container.insertAdjacentHTML(place, html);
};

const renderEvents = (container, template, data, place = `beforeend`) => {
  data.forEach((i) => container.insertAdjacentHTML(place, template(i)));
};

const renderMenu = (container, template, data, place = `afterend`) => {
  container.insertAdjacentHTML(place, template(data));
};

const renderFilers = (container, template, data, place = `afterend`) => {
  container.insertAdjacentHTML(place, template(data));
};

const tripInfoSection = document.querySelector(`section.trip-main__trip-info`);
render(tripInfoSection, TripInfo(), `afterbegin`);


const tripControlsHeadings = document.querySelectorAll(`.trip-main__trip-controls h2`);
renderMenu(tripControlsHeadings[0], TripControls, dataMenu);
renderFilers(tripControlsHeadings[1], TripFilters, dataFilters);


const eventListTempContainer = document.createElement(`div`);
render(eventListTempContainer, EventList());


const tripEventsList = eventListTempContainer.querySelector(` ul.trip-events__list`);
render(tripEventsList, EventEdit());

renderEvents(tripEventsList, Event, events);

const tripEventsSection = document.querySelector(`section.trip-events`);
render(tripEventsSection, TripSort() + eventListTempContainer.innerHTML);
