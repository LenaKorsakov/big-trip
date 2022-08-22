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
  #pointCache = generatePoints();

  /** @type {Destination[]} */
  #destinationCache = generateDestinations();

  /** @type {OfferGroup[]} */
  #offerCache = generateOfferGroups();


  getPoins() {
    return clone(this.#pointCache).map((point) => new PointAdapter(point));
  }

  /**
   * @param {number} id
   */
  getPointById(id) {
    const point = this.#pointCache.find((item) => item.id === id);

    return new PointAdapter(point);
  }

  /**
   * @param {PointType} type
   */
  getAvailableOffers(type) {
    const group = this.#offerCache.find((item) => item.type === type);

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
    return clone(this.#destinationCache);
  }

  getDestinationById(id) {
    const destination = this.#destinationCache.find((item) => item.id === id);

    return clone(destination);
  }
}
