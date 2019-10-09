import ModelCard from "./models/model-card.js";

const CARDS_STORE_KEY = `cards-store-key`;
const CITIES_STORE_KEY = `cities-store-key`;
const OFFERS_STORE_KEY = `offers-store-key`;

const objectToArray = (object) => {
  return Object.keys(object).map((id) => object[id]);
};

export default class Provider {
  constructor({api, store, generateId}) {
    this._api = api;
    this._store = store;
    this._generateId = generateId;
  }

  updateCard({id, data}) {
    if (this._isOnline()) {
      return this._api.updateCard({id, data}).then((card) => {
        this._store.setItem(CARDS_STORE_KEY, {key: card.id, item: ModelCard.toRAW(card)});
        return card;
      });
    } else {
      this._store.setItem(CARDS_STORE_KEY, {key: data.id, item: data});
      return Promise.resolve(ModelCard.parseCard(data));
    }
  }

  createCard({data}) {
    if (this._isOnline()) {
      return this._api.createCard({data}).then((card) => {
        this._store.setItem(CARDS_STORE_KEY, {key: card.id, item: ModelCard.toRAW(card)});
        return card;
      });
    } else {
      data.id = this._generateId();
      this._store.setItem(CARDS_STORE_KEY, {key: data.id, item: data});
      return Promise.resolve(ModelCard.parseCard(data));
    }
  }

  deleteCard({id}) {
    if (this._isOnline()) {
      return this._api.deleteCard({id}).then(() => {
        this._store.removeItem(CARDS_STORE_KEY, {key: id});
      });
    } else {
      this._store.removeItem(CARDS_STORE_KEY, {key: id});
      return Promise.resolve(true);
    }
  }

  getCards() {
    if (this._isOnline()) {
      return this._api.getCards().then((cards) => {
        cards.map((card) => this._store.setItem(CARDS_STORE_KEY, {key: card.id, item: ModelCard.toRAW(card)}));
        return cards;
      });
    } else {
      const rawCardsMap = this._store.getAll(CARDS_STORE_KEY);
      const rawCards = objectToArray(rawCardsMap);
      const cards = ModelCard.parseCards(rawCards);
      return Promise.resolve(cards);
    }
  }

  syncCards() {
    return this._api.syncCards(objectToArray(this._store.getAll(CARDS_STORE_KEY)));
  }

  getOffers() {
    if (this._isOnline()) {
      return this._api.getOffers().then((offers) => {
        offers.map((offer) => this._store.setItem(OFFERS_STORE_KEY, {key: offer.type, item: offer}));
        return offers;
      });
    } else {
      const offers = objectToArray(this._store.getAll(OFFERS_STORE_KEY));
      return Promise.resolve(offers);
    }
  }

  getCities() {
    if (this._isOnline()) {
      return this._api.getCities().then((cities) => {
        cities.map((city) => this._store.setItem(CITIES_STORE_KEY, {key: city.name, item: city}));
        return cities;
      });
    } else {
      const cities = objectToArray(this._store.getAll(CITIES_STORE_KEY));
      return Promise.resolve(cities);
    }
  }

  _isOnline() {
    return window.navigator.onLine;
  }
}
