import {TripInfo} from "./components/trip-info";
import {TripControls} from "./components/trip-controls";
import {TripFilters} from "./components/trip-filter";
import {TripEvent} from "./components/trip-event";
import {cityEvent, dateEvent, events} from "./data/event";
import {dataMenu} from "./data/menu";
import {render} from "./utils";
import {dataFilters} from "./data/filters";
import {EventList} from "./components/event-list";
import {EventEdit} from "./components/event-edit";

const renderEvents = (data) => {
  tripEventsList.forEach((container) => {
    data.forEach((onlyCardData) => {
      const eventCard = new TripEvent(onlyCardData);
      const eventForm = new EventEdit(onlyCardData);

      eventCard.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
        container.replaceChild(eventForm.getElement(), eventCard.getElement());
      });

      eventForm.getElement().querySelector(`.event--edit`).addEventListener(`submit`, () => {
        container.replaceChild(eventCard.getElement(), eventForm.getElement());
      });

      eventForm.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
        container.replaceChild(eventCard.getElement(), eventForm.getElement());
      });
      render(container, eventCard.getElement());
    });
  });
};
const renderMenu = (data) => {
  const tripControls = new TripControls(data);
  render(tripControlsElement, tripControls.getElement());
};
const renderFilers = (data) => {
  const tripFilters = new TripFilters(data);
  render(tripControlsElement, tripFilters.getElement());
};
const renderEventList = (data) => {
  const eventList = new EventList(data);
  render(tripEventsContainer, eventList.getElement());
};
const renderTripInfo = (data) => {
  const tripInfo = new TripInfo(data);
  render(tripInfoSection, tripInfo.getElement(), `begin`);
};
const updatePrice = (data) => {
  costValueElement.innerHTML = data;
};

const tripInfoSection = document.querySelector(`section.trip-main__trip-info`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const costValueElement = document.querySelector(`.trip-info__cost-value`);
const tripEventsContainer = document.querySelector(`.trip-events`);
let totalPrice = events.reduce((eventsPrice, currentItem) => {
  return eventsPrice + currentItem.price;
}, 0);

renderTripInfo(cityEvent);
renderMenu(dataMenu);
renderFilers(dataFilters);
renderEventList(dateEvent);
const tripEventsList = tripEventsContainer.querySelectorAll(`.trip-events__list`);
renderEvents(events);
updatePrice(totalPrice);
