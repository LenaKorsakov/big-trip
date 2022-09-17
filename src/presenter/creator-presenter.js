import Presenter from './presenter';
import PointType from '../enum/point-type';
import PointLabel from '../enum/point-label';
import Mode from '../enum/mode';
import PointAdapter from '../adapter/point-adapter';

/**
 * @template {ApplicationModel} Model
 * @template {CreatorView} View
 * @extends Presenter<Model,View>
 */
export default class CreatorPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this._buildView();

    this.view.addEventListener('close', this._onViewClose.bind(this));
    this.view.addEventListener('submit', this._onViewSubmit.bind(this));

    this.view.pointTypeSelectView.addEventListener('change',this.#onPointTypeSelectViewChange.bind(this));
    this.view.destinationSelectView.addEventListener('change', this.#onDestinationSelectViewChange.bind(this));

    this.model.addEventListener('mode',this._onModelMode.bind(this));
  }

  get currentPoint() {
    const point = new PointAdapter();
    const destinationName = this.view.destinationSelectView.getValue();
    const [startDate, endDate] = this.view.dataPickerView.getDates();

    point.basePrice = Number(this.view.priceInputView.getPrice());
    point.startDate = startDate;
    point.endDate = endDate;
    point.destinationId = this.model.destinations.findBy('name', destinationName)?.id;
    point.id = this.model.currentPoint.id;
    point.offerIds = this.view.offerSelectView.getSelectedValues().map(Number);
    point.type = this.view.pointTypeSelectView.getValue();
    point.isFavorite = false;

    return point;
  }

  _buildView() {
    /** @type {PointTypeOptionState[]} */
    const pointTypeOptionStates = Object.keys(PointType).map((key) => [PointLabel[key],PointType[key]]);

    /** @type {DestinationOptionState} */
    const destinationSelectOptions = this.model.destinations.listAll().map((destination) => destination.name);

    this.view.pointTypeSelectView.setOptions(pointTypeOptionStates);
    this.view.destinationSelectView.setOptions(destinationSelectOptions);
    this.view.dataPickerView.configure({dateFormat: 'd/m/y H:m'});
  }

  _updateView() {
    const point = this.model.currentPoint;

    this.view.pointTypeSelectView.setValue(point.type);

    this.view.destinationSelectView
      .setValue(this.model.destinations.findById(point.destinationId).name)
      .setLabel(PointLabel[PointType.findKey(this.model.currentPoint.type)]);

    this.view.dataPickerView.setDates(point.startDate, point.endDate);

    this.view.priceInputView.setPrice(point.basePrice);

    this.#updateDestinationView();
    this.#updateOfferSelectView();
  }

  #updateOfferSelectView() {
    const selectedType = this.view.pointTypeSelectView.getValue();
    const availableOffers = this.model.offerGroups.findById(selectedType).items;

    const offers = availableOffers.map((offer) => [offer.title, offer.price, offer.id, this.model.currentPoint.offerIds.includes(offer.id)]);

    this.view.offerSelectView
      .set('hidden', !availableOffers.length)
      .setOffers(offers);
  }

  #updateDestinationView() {
    const destination = this.model.destinations.findBy(
      'name',
      this.view.destinationSelectView.getValue()
    );

    const pictureStates = destination.pictures.map((picture) => [
      picture.src,
      picture.description,
    ]);


    this.view.destinationView
      .set('hidden', !destination.pictures.length)
      .setPictures(pictureStates)
      .setDescription(destination.description);
  }

  _saveCurrentPoint() {
    return this.model.points.add(this.currentPoint);
  }

  async _onViewSubmit() {
    this.view.setSaveButtonPressed(true);
    this.view.setFormDisabled(true);

    try {
      await this._saveCurrentPoint();
      this.view.close();
    }

    catch (exception) {
      this.view.shake();
    }

    this.view.setSaveButtonPressed(false);
    this.view.setFormDisabled(false);
  }

  _onModelMode() {
    if (this.model.getMode() !== Mode.CREATE) {
      return;
    }

    this._updateView();

    this.view.open();
  }

  _onViewClose() {
    this.model.setMode(Mode.VIEW);
  }

  #onPointTypeSelectViewChange() {
    const pointType = this.view.pointTypeSelectView.getValue();
    const key = PointType.findKey(pointType);

    this.view.destinationSelectView.setLabel(PointLabel[key]);
    this.#updateOfferSelectView();
  }

  #onDestinationSelectViewChange() {
    this.#updateDestinationView();
  }
}
