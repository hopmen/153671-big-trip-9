import {getRandomInteger, getRandomValue} from "../utils";

const COUNT_EVENTS = 5;
const titles = [
  `Taxi to airport`,
  `Flight to Geneva`,
  `Drive to Chamonix`,
  `Check into hotel`,
];
const typesIcons = [
  `bus`,
  `check-in`,
  `drive`,
  `flight`,
  `restaurant`,
  `ship`,
  `sightseeing`,
  `taxi`,
  `train`,
  `transport`,
  `trip`,
];
const citys = [
  `London`,
  `Los-Angeles`,
  `Hong Kong`,
  `Tangier`];
const descriptions = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet 
  varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. 
  Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin 
  eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. 
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. 
  Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. 
  Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`.split(`. `);

const MINUTE = 1000 * 60;
const DAY = MINUTE * 60 * 24;

const getDataEvent = () => {
  return {
    title: getRandomValue(titles),
    typeIcon: getRandomValue(typesIcons),
    city: getRandomValue(citys),
    pictures: new Array(getRandomInteger(2, 5)).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
    description: new Array(getRandomInteger(1, 3)).fill(``).map(() => getRandomValue(descriptions)),
    date: new Date(Date.now() + getRandomInteger(1, 5) * DAY),
    startTime: Date.now(),
    endTime: Date.now() + getRandomInteger(MINUTE * 10, MINUTE * 60),
    price: getRandomInteger(1, 100),
    options: [
      {
        id: `event-offer-luggage-1`,
        title: `Add luggage`,
        price: 10,
        isChecked: getRandomValue([true, false]),
      },
      {
        id: `event-offer-comfort-1`,
        title: `Switch to comfort class`,
        price: 20,
        isChecked: getRandomValue([true, false]),
      },
      {
        id: `event-offer-meal-1`,
        title: `Add meal`,
        price: 30,
        isChecked: getRandomValue([true, false]),
      },
      {
        id: `event-offer-seats-1`,
        title: `Choose seats`,
        price: 40,
        isChecked: getRandomValue([true, false]),
      },
      {
        id: `event-offer-train-1`,
        title: `Travel by train`,
        price: 50,
        isChecked: getRandomValue([true, false]),
      },
    ],
  };
};
const events = Array(COUNT_EVENTS).fill(``).map(() => getDataEvent());
const getCitiesData = (data) => {
  const allCitiesData = data.map((elem) => {
    return elem.city;
  });

  if (allCitiesData[0] !== allCitiesData[length - 1]) {
    return Array.from(new Set(allCitiesData));
  }
  return Array.from(new Set(allCitiesData).push(allCitiesData[0]));
};
const getDatesData = (data) => {
  const datesArray = data.map((elem) => {
    return elem.date;
  });

  return datesArray.sort((a, b) => a - b);
};

const cityEvent = getCitiesData(events);
const dateEvent = getDatesData(events);
export {events, cityEvent, dateEvent};
