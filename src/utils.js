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
  let startMoment = moment(start);
  let endMoment = moment(end);
  let diff = endMoment.diff(startMoment);
  let duration = ``;
  let minutes = Math.abs(moment.duration(diff).minutes());
  let hours = Math.abs(moment.duration(diff).hours());
  let days = Math.abs(moment.duration(diff).days());
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

export {Position, Mode, KeyCode, getDurationString, createElement, render, unrender};
