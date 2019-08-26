import {getRandomInteger, getRandomValue} from "../utils";

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
const pitures = new Array(getRandomInteger(2, 5)).fill(`http://picsum.photos/300/150?r=${Math.random()}`);
const descriptions = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet 
  varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. 
  Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin 
  eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. 
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. 
  Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. 
  Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`.split(`. `);

const MINUTE = 1000 * 60;
const startTime = Date.now() + getRandomInteger() * getRandomValue([1, -1]);
const endTime = new Date(2019, 7, 15, 10 + Math.round(Math.random() * 3));
const price = Math.floor(Math.random() * 100);
const options = [
  {
    id: `event-offer-luggage-1`,
    title: `Add luggage`,
    price: 10,
    isChecked: Math.round(Math.random()) ? true : false
  },
  {
    id: `event-offer-comfort-1`,
    title: `Switch to comfort class`,
    price: 150,
    isChecked: Math.round(Math.random()) ? true : false
  },
  {
    id: `event-offer-meal-1`,
    title: `Add meal`,
    price: 2,
    isChecked: Math.round(Math.random()) ? true : false
  },
  {
    id: `event-offer-seats-1`,
    title: `Choose seats`,
    price: 9,
    isChecked: Math.round(Math.random()) ? true : false
  },
  {
    id: `event-offer-train-1`,
    title: `Travel by train`,
    price: 40,
    isChecked: Math.round(Math.random()) ? true : false
  }
];
