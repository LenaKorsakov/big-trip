/** @typedef {import('../adapter/point-adapter').default} PointAdapter */
/** @typedef {(item: PointAdapter) => boolean} PointPredicate */

import Enum from './enum';

export default class FilterPredicate extends Enum {
  /**
   * @type {PointPredicate}
   */
  static EVERYTHING = () => true;

  /**
   * @type {PointPredicate}
   */
  static FUTURE = (point) => Date.parse(point.endDate) >= Date.now();
}
