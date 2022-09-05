import Adapter from './adapter';

export default class OfferGroupAdapter extends Adapter {
  /**
   * @param {OfferGroup} offerGroup
   */
  constructor(offerGroup) {
    super();

    this.id = offerGroup.type;
    this.items = offerGroup.offers.map((offer) => ({...offer}));
  }
}

