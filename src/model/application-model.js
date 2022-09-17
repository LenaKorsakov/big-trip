import Mode from '../enum/mode';
import PointType from '../enum/point-type';
import Model from './model';

export default class ApplicationModel extends Model {
  #mode = Mode.VIEW;
  /**
   * @param {DataTableModel<Point, PointAdapter>} points
   * @param {CollectionModel<Destination, DestinationAdapter>} destinations
   * @param {CollectionModel<OfferGroup, OfferGroupAdapter>} offerGroups
   */
  constructor(points, destinations, offerGroups) {
    super();

    this.points = points;
    this.currentPoint = null;
    this.destinations = destinations;
    this.offerGroups = offerGroups;
  }

  get defaultPoint() {
    const point = this.points.blank;

    point.type = PointType.TAXI;
    point.destinationId = this.destinations.item(0).id;
    point.startDate = new Date().toJSON();
    point.endDate = point.startDate;
    point.basePrice = '1';
    point.offerIds = [];
    point.isFavorite = false;

    return point;
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
   * @param {number} currentPointId
   */
  setMode(mode = this.#mode, currentPointId = null) {
    switch (mode) {
      case Mode.EDIT:
        this.currentPoint = this.points.findById(currentPointId);
        break;

      case Mode.CREATE:
        this.currentPoint = this.defaultPoint;
        break;

      case Mode.VIEW:
        this.currentPoint = null;
        break;

      default:
        throw new Error('Invalid mode');
    }

    this.#mode = mode;
    this.dispatchEvent(new CustomEvent('mode'));
  }


  getMode() {
    return this.#mode;
  }
}

