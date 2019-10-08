import {types} from "./model-types.js";

export default class ModelCard {
  constructor(data = {}) {
    this.id = data[`id`];
    this.type = {
      id: data[`type`],
      title: types.find(({id}) => id === data[`type`]).title,
      type: types.find(({id}) => id === data[`type`]).type,
      placeholder: types.find(({id}) => id === data[`type`]).placeholder,
      offers: data[`offers`].map((offer) => {
        return {
          id: offer.title.toLowerCase().replace(/\s+/g, ``),
          title: offer.title,
          price: offer.price,
          accepted: Boolean(offer.accepted)
        };
      })
    };
    this.city = data[`destination`];
    this.startTime = data[`date_from`];
    this.endTime = data[`date_to`];
    this.price = data[`base_price`];
    this.isFavorite = Boolean(data[`is_favorite`]);
  }

  static parseCard(data) {
    return new ModelCard(data);
  }

  static parseCards(data) {
    return data.map(ModelCard.parseCard);
  }

  static toRAW(data) {
    return {
      'base_price': data.price,
      'date_from': data.startTime,
      'date_to': data.endTime,
      'destination': data.city,
      'is_favorite': data.isFavorite,
      'offers': data.type.offers.map((offer) => {
        return {
          title: offer.title,
          price: offer.price,
          accepted: offer.isApplied
        };
      }),
      'type': data.type.id
    };
  }
}
