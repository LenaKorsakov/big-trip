import Enum from './enum';

export default class SortCompare extends Enum {
  /**
   * @type {Compare<PointAdapter>}
   */
  static DAY = (item, nextItem) => Date.parse(item.startDate) - Date.parse(nextItem.startDate);

  /**
   * @type {Compare<PointAdapter>}
   */
  static EVENT = () => 0;

  /**
   * @type {Compare<PointAdapter>}
   */
  static TIME = () => 0;

  /**
   * @type {Compare<PointAdapter>}
   */
  static PRICE = (item, nextItem) => nextItem.basePrice - item.basePrice;

  /**
   * @type {Compare<PointAdapter>}
   */
  static OFFERS = () => 0;
}
