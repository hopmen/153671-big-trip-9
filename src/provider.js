import ModelCard from "./models/model-card.js";

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
        this._store.setItem({key: card.id, item: ModelCard.toRAW(card)});
        return card;
      });
    } else {
      this._store.setItem({key: data.id, item: data});
      return Promise.resolve(ModelCard.parseCard(data));
    }
  }

  createCard({data}) {
    if (this._isOnline()) {
      return this._api.createCard({data}).then((card) => {
        this._store.setItem({key: card.id, item: ModelCard.toRAW(card)});
        return card;
      });
    } else {
      data.id = this._generateId();
      this._store.setItem({key: data.id, item: data});
      return Promise.resolve(ModelCard.parseCard(data));
    }
  }

  deleteCard({id}) {
    if (this._isOnline()) {
      return this._api.deleteCard({id}).then(() => {
        this._store.removeItem({key: id});
      });
    } else {
      this._store.removeItem({key: id});
      return Promise.resolve(true);
    }
  }

  getCards() {
    if (this._isOnline()) {
      return this._api.getCards().then((cards) => {
        cards.map((card) => this._store.setItem({key: card.id, item: ModelCard.toRAW(card)}));
        return cards;
      });
    } else {
      const rawCardsMap = this._store.getAll();
      const rawCards = objectToArray(rawCardsMap);
      const cards = ModelCard.parseCards(rawCards);
      return Promise.resolve(cards);
    }
  }

  getOffers() {
    return this._api.getOffers();
  }

  getCities() {
    return this._api.getCities();
  }

  _isOnline() {
    return window.navigator.onLine;
  }
}
