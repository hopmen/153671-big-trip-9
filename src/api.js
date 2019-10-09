import ModelCard from "./models/model-card.js";
import ModelOffer from "./models/model-offer.js";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => {
  return response.json();
};


export default class API {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getCities() {
    return this._load({url: `destinations`})
      .then(toJSON);
  }

  getOffers() {
    return this._load({url: `offers`})
      .then(toJSON)
      .then(ModelOffer.parseOffers);
  }

  getCards() {
    return this._load({url: `points`})
      .then(toJSON)
      .then(ModelCard.parseCards);
  }

  syncCards(cards) {
    return this._load({
      url: `points/sync`,
      method: `POST`,
      body: JSON.stringify(cards),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON);
  }

  createCard({data}) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})})
      .then(toJSON)
      .then(ModelCard.parseCard);
  }

  updateCard({id, data}) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})})
      .then(toJSON)
      .then(ModelCard.parseCard);
  }

  deleteCard({id}) {
    return this._load({
      url: `points/${id}`,
      method: Method.DELETE
    });
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
