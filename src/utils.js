import moment from 'moment';

const Position = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`,
  AFTER: `after`,
  BEFORE: `before`
};

const KeyCode = {
  ESCAPE: `Escape`,
  ESC: `Esc`
};

const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
};

const Action = {
  CREATE: `create`,
  DELETE: `delete`,
  UPDATE: `update`
};

const ButtonText = {
  SAVING: `Saving....`,
  DELETING: `Deleting....`,
  SAVE: `Save`,
  DELETE: `Delete`,
  CANCEL: `Cancel`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
    case Position.AFTER:
      container.after(element);
      break;
    case Position.BEFORE:
      container.before(element);
      break;
  }
};

const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

const getDurationString = (start, end) => {
  let duration = ``;
  let minutes = getDuration(start, end).minutes();
  let hours = getDuration(start, end).hours();
  let days = getDuration(start, end).days();
  days = (days < 10) ? `0${days}` : days;
  hours = (hours < 10) ? `0${hours}` : hours;
  minutes = (minutes < 10) ? `0${minutes}` : minutes;

  if (days === `00`) {
    duration = `${hours}H ${minutes}M`;
  } else if (hours === `00`) {
    duration = `${days}D ${minutes}M`;
  } else if (minutes === `00`) {
    duration = `${days}D ${hours}H`;
  } else {
    duration = `${days}D ${hours}H ${minutes}M`;
  }

  return duration;
};

const getDuration = (start, end) => {
  const startMoment = moment(start);
  const endMoment = moment(end);
  const diff = endMoment.diff(startMoment);
  return moment.duration(diff);
};

const sortMomentDates = (a, b) => {
  if (moment(a).isBefore(b)) {
    return -1;
  }
  if (moment(a).isAfter(b)) {
    return 1;
  }
  return 0;
};

export {Position, Mode, KeyCode, Action, ButtonText, getDuration, getDurationString, sortMomentDates, createElement, render, unrender};
