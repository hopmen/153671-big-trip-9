const createElement = (template) => {
  const elementContainer = document.createElement(`div`);
  elementContainer.innerHTML = template;
  return elementContainer.firstElementChild;
};

const render = (container, html, place) => place === `begin` ? container.prepend(html) : container.append(html);

const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getRandomValue = (array) => array[Math.floor((Math.random() * array.length))];

export {getRandomInteger, getRandomValue, createElement, render};
