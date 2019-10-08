export default class ModelOffer {
  constructor(data) {
    this.type = data[`type`];
    this.offers = data[`offers`].map((offer) => {
      return {
        id: offer.name.toLowerCase().replace(/\s+/g, ``),
        title: offer.name,
        price: offer.price
      };
    });
  }

  static parseOffer(data) {
    return new ModelOffer(data);
  }

  static parseOffers(data) {
    return data.map(ModelOffer.parseOffer);
  }
}
