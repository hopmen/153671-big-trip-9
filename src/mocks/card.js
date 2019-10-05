const COUNT_CARD = 5;
const COUNT_PICTURE = 5;

const offers = [{
  title: `Add luggage`,
  price: 10 + Math.floor(Math.random() * 10),
  isApplied: Boolean(Math.round(Math.random()))
}, {
  title: `Switch to comfort class`,
  price: 10 + Math.floor(Math.random() * 10),
  isApplied: Boolean(Math.round(Math.random()))
}, {
  title: `Add meal`,
  price: 10 + Math.floor(Math.random() * 10),
  isApplied: Boolean(Math.round(Math.random()))
}, {
  title: `Choose seats`,
  price: 10 + Math.floor(Math.random() * 10),
  isApplied: Boolean(Math.round(Math.random()))
}, {
  title: `Travel by train`,
  price: 10 + Math.floor(Math.random() * 10),
  isApplied: Boolean(Math.round(Math.random()))
}];

const types = [{
  id: `taxi`,
  title: `Taxi`,
  placeholder: `to`
},
{
  id: `bus`,
  title: `Bus`,
  placeholder: `to`
},
{
  id: `train`,
  title: `Train`,
  placeholder: `to`
},
{
  id: `trip`,
  title: `Trip`,
  placeholder: `at`
},
{
  id: `ship`,
  title: `Ship`,
  placeholder: `to`
},
{
  id: `check-in`,
  title: `Check-in`,
  placeholder: `in`
},
{
  id: `transport`,
  title: `Transport`,
  placeholder: `to`
},
{
  id: `drive`,
  title: `Drive`,
  placeholder: `at`
},
{
  id: `sightseeing`,
  title: `Sightseeing`,
  placeholder: `at`
},
{
  id: `restaurant`,
  title: `Restaurant`,
  placeholder: `in`
}
];

const getCard = () => ({
  type: types[Math.floor(Math.random() * 10)],
  city: [
    `Amsterdam`,
    `Geneva`,
    `Barcelona`,
    `Dresden`,
    `Praha`
  ][Math.floor(Math.random() * 5)],
  pictures: new Array(COUNT_PICTURE).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  description: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
  ],
  startTime: Date.now() - Math.floor(Math.random() * 2) * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000,
  endTime: Date.now() + Math.floor(Math.random() * 2) * 24 * 60 * 60 * 1000 + 20 * 60 * 1000,
  price: 100 + Math.floor(Math.random() * 100),
  offers: new Set(offers)
});

export default new Array(COUNT_CARD).fill(``).map(getCard).sort((a, b) => a.startTime < b.startTime);
