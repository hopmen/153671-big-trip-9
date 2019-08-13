import {TripInfo} from "./components/trip-info";
import {TripControls} from "./components/menu";
import {TripFilters} from "./components/filter";
import {TripSort} from "./components/sort";
import {EventList} from "./components/event-list";
import {Event} from "./components/event";
import {EventEdit} from "./components/event-edit";


const render = (container, html, place = `beforeend`) => {
  container.insertAdjacentHTML(place, html);
};

const tripInfoSection = document.querySelector(`section.trip-main__trip-info`);
render(tripInfoSection, TripInfo(), `afterbegin`);


const tripControlsHeadings = document.querySelectorAll(`.trip-main__trip-controls h2`);
render(tripControlsHeadings[0], TripControls(), `afterend`);
render(tripControlsHeadings[1], TripFilters(), `afterend`);


const eventListTempContainer = document.createElement(`div`);
render(eventListTempContainer, EventList());


const tripEventsList = eventListTempContainer.querySelector(` ul.trip-events__list`);
render(tripEventsList, EventEdit());
for (let i = 3; i > 0; i--) {
  render(tripEventsList, Event());
}

const tripEventsSection = document.querySelector(`section.trip-events`);
render(tripEventsSection, TripSort() + eventListTempContainer.innerHTML);
