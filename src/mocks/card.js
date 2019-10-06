const COUNT_CARD = 5;
const COUNT_PICTURE = 5;

const types = [{
  id: `taxi`,
  title: `Taxi`,
  placeholder: `to`,
  offers: [{
    id: `taxi-uber`,
    title: `Choose Uber`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }, {
    id: `taxi-yandex`,
    title: `Choose Yandex`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }]
},
{
  id: `bus`,
  title: `Bus`,
  placeholder: `to`,
  offers: [{
    id: `bus-seat`,
    title: `Choose seats`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }, {
    id: `bus-meal`,
    title: `Add meal`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }]
},
{
  id: `train`,
  title: `Train`,
  placeholder: `to`,
  offers: [{
    id: `train-luggage`,
    title: `Add luggage`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }, {
    id: `train-class`,
    title: `Switch to comfort class`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }, {
    id: `train-meal`,
    title: `Add meal`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }, {
    id: `train-seat`,
    title: `Choose seats`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }]
},
{
  id: `flight`,
  title: `Flight`,
  placeholder: `to`,
  offers: [{
    id: `flight-seat`,
    title: `Choose seats`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }, {
    id: `flight-meal`,
    title: `Choose meal`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }, {
    id: `flight-luggage`,
    title: `Add luggage`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }]
},
{
  id: `ship`,
  title: `Ship`,
  placeholder: `to`,
  offers: []
},
{
  id: `check-in`,
  title: `Check-in`,
  placeholder: `in`,
  offers: [{
    id: `check-in-room`,
    title: `Change room`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }, {
    id: `check-in-early`,
    title: `Early check-in`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }, {
    id: `check-in-late`,
    title: `Late check-in`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  },
  {
    id: `check-in-breakfast`,
    title: `Add breakfast`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }]
},
{
  id: `transport`,
  title: `Transport`,
  placeholder: `to`,
  offers: []
},
{
  id: `drive`,
  title: `Drive`,
  placeholder: `to`,
  offers: []
},
{
  id: `sightseeing`,
  title: `Sightseeing`,
  placeholder: `in`,
  offers: []
},
{
  id: `restaurant`,
  title: `Restaurant`,
  placeholder: `in`,
  offers: [{
    id: `restaurant-table`,
    title: `Reserve table`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }, {
    id: `restaurant-order`,
    title: `Pre order`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }, {
    id: `restaurant-tips`,
    title: `Tips include`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  },
  {
    id: `restaurant-cuisine`,
    title: `Choose cuisine`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }]
}
];

const cities = [{
  name: `Amsterdam`,
  description: `Amsterdam Amsterdam is the capital and largest city of Netherlands. Population -743, 400 people Area -219 km ² Amsterdam is located in the north-west of the Netherlands in the province of North Holland at the mouth of the Amstel River in the Bay Eysselmer.`,
  pictures: new Array(COUNT_PICTURE).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
},
{
  name: `Geneva`,
  description: `Geneva. The small urban gem at the gateway to the mountains boasts landscapes to take your breath away! Follow this article and make sure you don’t miss any of the city’s most beautiful spots!`,
  pictures: new Array(COUNT_PICTURE).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
},
{
  name: `Barcelona`,
  description: `Catalonia and Barcelona has become one of the first tourist destination of Spain, it has everything to please the majority of visitors : with a history among the oldest in Europe, a capital, Barcelona, which never sleeps and an inland full of charm not to forget beautiful beaches in La Costa Brava. The variety of artistic treasures, the Romanesque churches and the great names in modern art and architecture`,
  pictures: new Array(COUNT_PICTURE).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
},
{
  name: `Dresden`,
  description: `The name of Dresden is a synonym for art and culture. The Saxon capital offers cultural and art treasures of European rank, world-famous art collections and also a lively theatre and music scene.`,
  pictures: new Array(COUNT_PICTURE).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
},
{
  name: `Praha`,
  description: `The story of Prague is no less turbulent than that of similarly large cities in Central Europe. It saw its first golden age under the rule of Charles IV in the 14th century. Prague was, at that time, the third largest city in Europe and witnessed something of an explosion in construction: the Charles University, the New Town, the Charles Bridge, and Saint Vitus Cathedral were all built during this period.`,
  pictures: new Array(COUNT_PICTURE).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
}];

const getCard = () => ({
  type: types[Math.floor(Math.random() * 10)],
  city: cities[Math.floor(Math.random() * 5)],
  startTime: Date.now() - Math.floor(Math.random() * 2) * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000,
  endTime: Date.now() + Math.floor(Math.random() * 2) * 24 * 60 * 60 * 1000 + 20 * 60 * 1000,
  price: 100 + Math.floor(Math.random() * 100),
});

const cards = new Array(COUNT_CARD).fill(``).map(getCard);

export {cards, cities, types};
