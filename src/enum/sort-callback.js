import Enum from './enum';
/** @typedef {import('../adapter/point-adapter').default} PointAdapter */

export default class SortCallback extends Enum {
  /**
   * @param {PointAdapter} pointA
   * @param {PointAdapter} pointB
   */
  static DAY = (pointA, pointB) => Date.parse(pointA.startDate) - Date.parse(pointB.startDate);
  static PRICE = (pointA, pointB) => Number(pointB.basePrice) - Number(pointA.basePrice);
}

export const sortPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;
