export default class PointAdapter {
  /**
   * @param {Point} point
   */
  constructor(point) {
    this.basePrice = point.base_price;
    this.startDate = point.startDate;
    this.endDate = point.date_to;
    this.destinationId = point.destination;
    this.id = Number(point.id);
    this.offerIds = point.offers;
    this.type = point.type;
  }

  /**
   * @return {Point}
   */
  toJSON() {
    return {
      'base_price': this.basePrice,
      'startDate': this.startDate,
      'date_to': this.endDate,
      'destination': this.destinationId,
      'id': String(this.id),
      'offers': this.offerIds,
      'type': this.type
    };
  }
}
