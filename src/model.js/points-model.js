import { generatePoints, generateDestinations, generateOfferGroups } from '../mock/point-mock';

export default class AggregatedPointsModel {
  get() {
    const points = generatePoints();
    const destinations = generateDestinations();
    const offerGroups = generateOfferGroups();

    return points.map((point) => ({
      ...point,
      destination: destinations.find((destination) => destination.id === point.destination),
      offers: offerGroups.find((offerGroup) => offerGroup.type === point.type).offers.filter((offer) => point.offers.includes(offer.id)),
    }));
  }
}

