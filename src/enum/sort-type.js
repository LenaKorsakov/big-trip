import Enum from './enum';

export default class SortType extends Enum {
  static DAY = 'day';
  static EVENT = 'event';
  static TIME = 'time';
  static PRICE = 'price';
  static OFFERS = 'offers';
}
