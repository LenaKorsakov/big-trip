import { generatePoints, generateDestinations, generateOfferGroups } from '../mock/point-mock';

const points = generatePoints();
const destinations = generateDestinations();
const offerGroups = generateOfferGroups();
export default class PointsModel {
  /**
   * @param {OfferType} type
   */
  getAvailableOffers(type) {
    return offerGroups.find((offerGroup) => offerGroup.type === type).offers;
  }

  get() {
    return points.map((point) => ({
      ...point,
      destination: destinations.find((destination) => destination.id === point.destination),
      offers: offerGroups
        .find((offerGroup) => offerGroup.type === point.type)
        .offers
        .filter((offer) => point.offers.includes(offer.id)),
    }));
  }
}

