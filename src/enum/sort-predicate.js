import Enum from './enum';

export default class SortPredicate extends Enum {
  static DAY = 'day';
  static EVENT = 'event';
  static TIME = 'time';
  static PRICE = 'price';
  static OFFERS = 'offers';
}
