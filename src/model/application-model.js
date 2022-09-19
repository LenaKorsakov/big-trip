import Mode from '../enum/mode';
import PointType from '../enum/point-type';
import Model from './model';

export default class ApplicationModel extends Model {
  #mode = Mode.VIEW;
  /**
   * @param {DataTableModel<Point, PointAdapter>} pointsModel
   * @param {CollectionModel<Destination, DestinationAdapter>} destinationsModel
   * @param {CollectionModel<OfferGroup, OfferGroupAdapter>} offerGroupsModel
   */
  constructor(pointsModel, destinationsModel, offerGroupsModel) {
    super();

    this.pointsModel = pointsModel;
    this.currentPoint = null;
    this.destinationsModel = destinationsModel;
    this.offerGroupsModel = offerGroupsModel;
  }

  get defaultPoint() {
    const point = this.pointsModel.blank;

    point.type = PointType.TAXI;
    point.destinationId = this.destinationsModel.item(0).id;
    point.startDate = new Date().toJSON();
    point.endDate = point.startDate;
    point.basePrice = '1';
    point.offerIds = [];
    point.isFavorite = false;

    return point;
  }

  async ready() {
    await Promise.all([
      this.pointsModel.ready(),
      this.destinationsModel.ready(),
      this.offerGroupsModel.ready()
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
        this.currentPoint = this.pointsModel.findById(currentPointId);
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

