import Presenter from './presenter.js';
import Mode from '../enum/mode.js';
import { formatStringToDate,formatStringToHour} from '../format';

/**
 * @template {ApplicationModel} Model
 * @template {PointListView} View
 * @extends Presenter<Model,View>
 */
export default class PointListPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.onModelPointsChange().addEventListener('point-edit', (/** @type {CustomEvent} */ event) => {
      this.model.setMode(Mode.EDIT, event.detail);
    });

    this.model.points.addEventListener(
      ['add', 'update', 'remove', 'filter', 'sort'],
      this.onModelPointsChange.bind(this)
    );
  }

  onModelPointsChange() {
    /** @type {PointState[]} */
    const states = this.model.points.list().map((point) => {
      const destination = this.model.destinations.findById(point.destinationId);
      const offerGroup = this.model.offerGroups.findById(point.type);

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
        startDate: formatStringToDate(point.startDate),
        icon: point.type,
        startTime: formatStringToHour(point.startDate),
        endTime: formatStringToHour(point.endDate),
        price: point.basePrice,
        offers: offerStates,
        title: destination.name
      };
    });

    return this.view.setItems(states);
  }
}
