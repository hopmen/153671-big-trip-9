import {types} from "./model-types.js";

export default class ModelCard {
  constructor(card = {}) {
    this.id = card[`id`];
    this.type = {
      id: card[`type`],
      title: types.find(({id}) => id === card[`type`]).title,
      type: types.find(({id}) => id === card[`type`]).type,
      placeholder: types.find(({id}) => id === card[`type`]).placeholder,
      offers: card[`offers`].map((offer) => {
        return {
          id: offer.title.toLowerCase().replace(/\s+/g, ``),
          title: offer.title,
          price: offer.price,
          accepted: Boolean(offer.accepted)
        };
      })
    };
    this.city = card[`destination`];
    this.startTime = card[`date_from`];
    this.endTime = card[`date_to`];
    this.price = card[`base_price`];
    this.isFavorite = Boolean(card[`is_favorite`]);
  }

  static parseCard(card) {
    return new ModelCard(card);
  }

  static parseCards(cards) {
    return cards.map(ModelCard.parseCard);
  }

  static toRAW(card) {
    return {
      'id': card.id ? card.id : null,
      'base_price': card.price,
      'date_from': card.startTime,
      'date_to': card.endTime,
      'destination': card.city,
      'is_favorite': card.isFavorite,
      'offers': card.type.offers.map((offer) => {
        return {
          title: offer.title,
          price: offer.price,
          accepted: offer.isApplied
        };
      }),
      'type': card.type.id
    };
  }
}
