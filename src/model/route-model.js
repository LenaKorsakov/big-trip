import PointAdapter from '../adapter/point-adapter';
import { generatePoints, generateDestinations, generateOfferGroups } from '../mock/point-mock';

/**
 * @template T
 * @param {T} target
 * @return {T}
 */
const clone = (target) => JSON.parse(JSON.stringify(target));
export default class RouteModel {
  /** @type {Point[]} */
  #points = generatePoints();

  /** @type {Destination[]} */
  #destinations = generateDestinations();

  /** @type {OfferGroup[]} */
  #offerGroups = generateOfferGroups();


  getPoints() {
    return clone(this.#points).map((point) => new PointAdapter(point));
  }

  /**
   * @param {number} id
   */
  getPointById(id) {
    const point = this.#points.find((item) => Number(item.id) === id);

    return new PointAdapter(point);
  }

  /**
   * @param {PointType} type
   */
  getAvailableOffers(type) {
    const group = this.#offerGroups.find((item) => item.type === type);

    return clone(group.offers);
  }

  /**
   *
   * @param {PointType} type
   * @param {number[]} ids
   */
  getOffers(type, ids) {
    const offers = this.getAvailableOffers(type).filter((item) => ids.includes(item.id));

    return clone(offers);
  }

  getAvailableDestinations() {
    return clone(this.#destinations);
  }

  getDestinationById(id) {
    const destination = this.#destinations.find((item) => item.id === id);

    return clone(destination);
  }

  getDestinationByName(name) {
    const destination = this.#destinations.find((item) => item.name === name);

    return clone(destination);
  }
}
