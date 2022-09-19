import Presenter from './presenter';
import PointType from '../enum/point-type';
import PointLabel from '../enum/point-label';
import Mode from '../enum/mode';

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

    this.view.pointTypeSelectView.addEventListener('change', this.#onPointTypeSelectViewChange.bind(this));
    this.view.destinationSelectView.addEventListener('change', this.#onDestinationSelectViewChange.bind(this));
    this.view.datePickerView.addEventListener('change', this.#onDatePickerViewChange.bind(this));
    this.view.priceInputView.addEventListener('change', this.#onPriceInputViewChange.bind(this));
    this.view.offerSelectView.addEventListener('change', this.#onOffersSelectViewChange.bind(this));

    this.model.addEventListener('mode',this._onModelMode.bind(this));
  }

  _buildView() {
    /** @type {PointTypeOptionState[]} */
    const pointTypeOptionStates = Object.keys(PointType).map((key) => [PointLabel[key],PointType[key]]);

    /** @type {DestinationOptionState} */
    const destinationSelectOptions = this.model.destinationsModel.listAll().map((destination) => destination.name);

    this.view.pointTypeSelectView.setOptions(pointTypeOptionStates);
    this.view.destinationSelectView.setOptions(destinationSelectOptions);
    this.view.datePickerView.configure({dateFormat: 'd/m/y H:m'});
  }

  _updateView() {
    const point = this.model.currentPoint;

    this.view.pointTypeSelectView.setValue(point.type);

    this.view.destinationSelectView
      .setValue(this.model.destinationsModel.findById(point.destinationId).name)
      .setLabel(PointLabel[PointType.findKey(this.model.currentPoint.type)]);

    this.view.datePickerView.setDates(point.startDate, point.endDate);

    this.view.priceInputView.setPrice(point.basePrice);

    this._updateDestinationView();
    this._updateOfferSelectView();
  }

  _updateOfferSelectView() {
    const selectedType = this.view.pointTypeSelectView.getValue();
    const availableOffers = this.model.offerGroupsModel.findById(selectedType).items;

    const offers = availableOffers.map((offer) => [offer.title, offer.price, offer.id, this.model.currentPoint.offerIds.includes(offer.id)]);

    this.view.offerSelectView
      .set('hidden', !availableOffers.length)
      .setOffers(offers);
  }

  _updateDestinationView() {
    const destination = this.model.destinationsModel.findBy(
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
    return this.model.pointsModel.add(this.model.currentPoint);

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

    this.model.currentPoint.type = pointType;

    this.view.destinationSelectView.setLabel(PointLabel[key]);
    this._updateOfferSelectView();
  }

  #onDestinationSelectViewChange() {
    const destinationName = this.view.destinationSelectView.getValue();
    const destination = this.model.destinationsModel.findBy('name', destinationName);

    this.model.currentPoint.destinationId = destination?.id;

    this._updateDestinationView();
  }

  #onDatePickerViewChange() {
    const [startDate, endDate] = this.view.datePickerView.getDates();

    Object.assign(this.model.currentPoint.startDate, {startDate, endDate});
  }

  #onPriceInputViewChange() {
    this.model.currentPoint.basePrice = Number(this.view.priceInputView.getPrice());
  }

  #onOffersSelectViewChange() {
    this.model.currentPoint.offerIds = this.view.offerSelectView.getSelectedValues().map(Number);
  }
}
