import PointAdapter from '../adapter/point-adapter';
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
    this.editablePoint = null;
    this.destinations = destinations;
    this.offerGroups = offerGroups;
  }

  get defaultPoint() {
    const point = new PointAdapter();
    const [firstDestination] = this.destinations.listAll();

    point.type = PointType.BUS;
    point.destinationId = firstDestination.id;
    point.startDate = new Date().toJSON();
    point.endDate = point.startDate;
    point.basePrice = 0;
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
   * @param {number} editablePointId
   */
  setMode(mode = Mode.VIEW, editablePointId = null) {
    switch (mode) {
      case Mode.EDIT:
        this.editablePoint = this.points.findById(editablePointId);
        break;

      case Mode.CREATE:
        this.editablePoint = this.defaultPoint;
        break;

      case Mode.VIEW:
        this.editablePoint = null;
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

