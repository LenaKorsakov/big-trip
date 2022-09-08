import Model from './model';

export default class ApplicationModel extends Model {
  #mode;
  /**
   * @param {DataTableModel<Point, PointAdapter>} points
   * @param {CollectionModel<Destination, DestinationAdapter>} destinations
   * @param {CollectionModel<OfferGroup, OfferGroupAdapter>} offerGroups
   */
  constructor(points, destinations, offerGroups) {
    super();

    this.points = points;
    this.editablePoint = null;
    this.destinations = destinations;
    this.offerGroups = offerGroups;
  }

  async ready() {
    await Promise.all([
      this.points.ready(),
      this.destinations.ready(),
      this.offerGroups.ready()
    ]);
  }

  /**
   *
   * @param {number} mode
   * @param {number} editablePointId
   */
  setMode(mode, editablePointId = null) {
    this.#mode = mode;
    this.editablePoint = this.points.findById(editablePointId);

    this.dispatchEvent(new CustomEvent('mode'));
  }

  getMode() {
    return this.#mode;
  }
}

