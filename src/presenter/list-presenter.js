import Presenter from './presenter.js';
import Mode from '../enum/mode.js';
import { formatStringToDate,formatStringToHour} from '../format';

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

    this.updateView();

    this.view.addEventListener('edit', this.onViewEdit.bind(this));

    this.model.points.addEventListener(
      ['add', 'update', 'remove', 'filter', 'sort'],
      this.onModelPointsChange.bind(this)
    );
  }

  updateView() {
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

    return this.view.setPoints(states);
  }

  /**
   * @param {CustomEvent & {target: PointView}} event
   */
  onViewEdit(event) {
    this.model.setMode(Mode.EDIT, event.target.getId());
  }

  /**
   *
   * @param {CustomEvent<PointAdapter>} event
   */
  onModelPointsChange(event) {
    if (event.type === 'remove') {
      this.view.findById(event.detail.id)?.remove();
    }
    this.updateView();
  }
}
