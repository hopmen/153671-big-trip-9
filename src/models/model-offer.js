export default class ModelOffer {
  constructor(transportOffers) {
    this.type = transportOffers[`type`];
    this.offers = transportOffers[`offers`].map((offer) => {
      return {
        id: offer.name.toLowerCase().replace(/\s+/g, ``),
        title: offer.name,
        price: offer.price
      };
    });
  }

  static parseOffer(offer) {
    return new ModelOffer(offer);
  }

  static parseOffers(offers) {
    return offers.map(ModelOffer.parseOffer);
  }
}
