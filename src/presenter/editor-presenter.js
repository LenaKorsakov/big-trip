/** @typedef {import('../adapter/point-adapter').default} PointAdapter */
/** @typedef {import('../view/point-view').default} PointView  */

import Type from '../enum/type';
import TypeLabel from '../enum/type-label';
import { formatStringToFullFDate } from '../format';
import Presenter from './presenter';

/**
 * @template {ApplicationModel} Model
 * @template {EditorView} View
 * @extends Presenter<Model,View>
 */
export default class EditorPresenter extends Presenter {
  /** @type {PointAdapter} */
  #point;
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.#buildTypeSelectView().addEventListener(
      'change',
      this.onTypeSelectChange.bind(this)
    );

    this.#buildDestinationSelectView().addEventListener(
      'change',
      this.onDestinationSelectChange.bind(this)
    );

    document.addEventListener(
      'point-edit',
      this.onPointEdit.bind(this)
    );
  }

  #buildTypeSelectView() {
    const optionStates = Object.keys(Type).map((key) => [
      TypeLabel[key],
      Type[key],
    ]);

    return this.view.typeSelectView
      .setOptions(optionStates)
      .setValue(Type.TAXI);
  }

  #buildDestinationSelectView() {
    const destinations = this.model.destinations.listAll();

    return this.view.destinationSelectView.setOptions(
      destinations.map((destination) => ['', destination.name])
    );
  }

  #updateTypeSelectView() {
    this.view.typeSelectView.setValue(this.#point.type);
  }

  #updateDestinationSelectView() {
    const destination = this.model.destinations.findById(this.#point.destinationId);
    const key = Type.resolveKey(this.#point.type);

    this.view.destinationSelectView
      .setValue(destination.name)
      .setLabel(TypeLabel[key]);
  }

  #updateDatePickerView() {
    this.view.dataPickerView
      .setStartTime(formatStringToFullFDate(this.#point.startDate))
      .setEndTime(formatStringToFullFDate(this.#point.endDate))
      .setStartTimepicker()
      .setEndTimepicker();
  }

  #updatePriceInputView() {
    this.view.priceInputView.setPrice(this.#point.basePrice);
  }

  #updateOfferSelectView() {
    const selectedType = this.view.typeSelectView.getValue();
    const availableOffers = this.model.offerGroups.findById(selectedType).items;

    const offers = availableOffers.map((offer) => [offer.title, offer.price, this.#point.offerIds.includes(offer.id)]);

    this.view.offerSelectView
      .setVisibility(!availableOffers.length)
      .setOffers(offers);
  }

  #updateDestinationDetailsView() {
    const destination = this.model.destinations.findBy(
      'name',
      this.view.destinationSelectView.getValue()
    );
    const pictureStates = destination.pictures.map((picture) => [
      picture.src,
      picture.description,
    ]);

    this.view.destinationDetailsView
      .setVisibility(!destination.pictures.length)
      .setPictures(pictureStates)
      .setDescription(destination.description);
  }


  onPointEdit(event) {
    this.#point = this.model.points.findById(event.detail);

    this.view.close();

    this.#updateTypeSelectView();
    this.#updateDestinationSelectView();
    this.#updateDatePickerView();
    this.#updatePriceInputView();
    this.#updateOfferSelectView();
    this.#updateDestinationDetailsView();

    this.view.link(event.target).open();
  }

  onTypeSelectChange() {
    const pointType = this.view.typeSelectView.getValue();
    const key = Type.resolveKey(pointType);

    this.view.destinationSelectView.setLabel(TypeLabel[key]);
    this.#updateOfferSelectView();
  }

  onDestinationSelectChange() {
    this.#updateDestinationDetailsView();
  }
}
