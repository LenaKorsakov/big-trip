import Presenter from './presenter';
import Mode from '../enum/mode';
import {formatNumber, formatTime, formatDate} from '../format';
import {escape} from 'he';
import PointLabel from '../enum/point-label';
import PointType from '../enum/point-type';

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
      this.#onPointsModelChange.bind(this)
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
        startDate: formatDate(point.startDate),
        icon: escape(point.type),
        startTime: formatTime(point.startDate),
        endTime: formatTime(point.endDate),
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
   * @param {CustomEvent<PointAdapter>} event
   */
  #onPointsModelChange(event) {
    if (event.type === 'remove') {
      this.view.findById(event.detail.id)?.remove();

      return;
    }
    this.#updateView();
  }
}
