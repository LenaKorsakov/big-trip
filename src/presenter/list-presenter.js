import Presenter from './presenter';
import Mode from '../enum/mode';
import {formatNumber, formatDateTime} from '../format';
import {escape} from 'he';
import PointLabel from '../enum/point-label';
import PointType from '../enum/point-type';

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
          result.push([
            escape(offer.title),
            escape(formatNumber(offer.price))
          ]);
        }
        return result;
      }, []);

      return {
        id: escape(point.id),
        isoStartDate: escape(point.startDate),
        isoEndDate: escape(point.endDate),
        startDate: formatDateTime(point.startDate, DATE_FORMAT),
        icon: escape(point.type),
        startTime: formatDateTime(point.startDate, TIME_FORMAT),
        endTime: formatDateTime(point.endDate, TIME_FORMAT),
        price: escape(formatNumber(point.basePrice)),
        offers: offerStates,
        title: `${PointLabel[PointType.findKey(point.type)]} ${escape(destination.name)}`
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

      return;
    }
    this.#updateView();
  }
}
