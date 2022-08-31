/** @typedef {import('../adapter/point-adapter').default} PointAdapter */
import { isDateInFuture } from '../filters-utils';
import Enum from './enum';

export default class FilterPredicate extends Enum {
  static EVERYTHING = () => true;
  /**
   * @param {PointAdapter} point
   */
  static FUTURE = (point) => isDateInFuture(point.startDate, point.endDate);
}
