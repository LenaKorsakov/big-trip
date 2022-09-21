import Presenter from './presenter';
import Mode from '../enum/mode';
import {formatNumber, formatDateTime} from '../format';

const DATE_FORMAT = 'D MMM';
const TIME_FORMAT = 'HH:mm';

/**
 * @template {ApplicationModel} Model
 * @template {ListView} View
 * @extends Presenter<Model,View>
 */
export default class ListPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.#updateView();

    this.view.addEventListener('edit', this.#onViewEdit.bind(this));

    this.model.pointsModel.addEventListener(
      ['add', 'update', 'remove', 'filter', 'sort'],
      this.#onModelPointsEvent.bind(this)
    );
  }

  #updateView() {
    /** @type {PointState[]} */
    const states = this.model.pointsModel.list().map((point) => {
      const destination = this.model.destinationsModel.findById(point.destinationId);
      const offerGroup = this.model.offerGroupsModel.findById(point.type);

      /** @type {OfferState[]} */
      const offerStates = offerGroup.items.reduce((result, offer) => {
        if (point.offerIds.includes(offer.id)) {
          result.push([offer.title, offer.price]);
        }
        return result;
      }, []);

      return {
        id: point.id,
        isoStartDate: point.startDate,
        isoEndDate: point.endDate,
        startDate: formatDateTime(point.startDate, DATE_FORMAT),
        icon: point.type,
        startTime: formatDateTime(point.startDate, TIME_FORMAT),
        endTime: formatDateTime(point.endDate, TIME_FORMAT),
        price: formatNumber(point.basePrice),
        offers: offerStates,
        title: destination.name
      };
    });

    return this.view.setPoints(states);
  }

  /**
   * @param {CustomEvent & {target: PointView}} event
   */
  #onViewEdit(event) {
    this.model.setMode(Mode.EDIT, event.target.getId());
  }

  /**
   *
   * @param {CustomEvent<PointAdapter>} event
   */
  #onModelPointsEvent(event) {
    if (event.type === 'remove') {
      this.view.findById(event.detail.id)?.remove();
    }
    this.#updateView();
  }
}
