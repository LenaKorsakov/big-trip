import Presenter from './presenter';
import Type from '../enum/type';
import TypeLabel from '../enum/type-label';
import Mode from '../enum/mode';
import { getRandomCombination } from '../utils.js';

/**
 * @template {ApplicationModel} Model
 * @template {EditorView} View
 * @extends Presenter<Model,View>
 */
export default class EditorPresenter extends Presenter {
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

    this.#buildDatePickerView();

    this.view.addEventListener('close', () => {
      this.model.setMode(Mode.VIEW);
    });

    this.model.addEventListener(
      'mode',
      this.onModelMode.bind(this)
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

  #buildDatePickerView() {
    const DATE_FORMAT = 'd/m/y h:m';

    const today = Date.now();

    const options = {
      dateFormat: DATE_FORMAT,
      locale: {firstDayOfWeek: 1},
      //minDate: today
    };

    this.view.dataPickerView
      .setStartDate(today, options)
      .setEndDate(today, options);
  }

  #updateTypeSelectView() {
    this.view.typeSelectView.setValue(this.model.editablePoint.type);
  }

  #updateDestinationSelectView() {
    const destination = this.model.destinations.findById(this.model.editablePoint.destinationId);
    const key = Type.findKey(this.model.editablePoint.type);

    this.view.destinationSelectView
      .setValue(destination.name)
      .setLabel(TypeLabel[key]);
  }

  #updateDatePickerView() {
    this.view.dataPickerView
      .setStartDate(this.model.editablePoint.startDate)
      .setEndDate(this.model.editablePoint.endDate, {minDate: this.model.editablePoint.startDate});
  }

  #updatePriceInputView() {
    this.view.priceInputView.setPrice(this.model.editablePoint.basePrice);
  }

  #updateOfferSelectView() {
    const ID_LENGTH = 5;

    const selectedType = this.view.typeSelectView.getValue();
    const availableOffers = this.model.offerGroups.findById(selectedType).items;

    const offers = availableOffers.map((offer) => [offer.title, offer.price, getRandomCombination(ID_LENGTH), this.model.editablePoint.offerIds.includes(offer.id)]);

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


  onModelMode() {
    if (this.model.getMode() !== Mode.EDIT) {
      return;
    }

    const pointView = document.querySelector(`#item-${this.model.editablePoint.id}`);
    this.view.close(true);

    this.#updateTypeSelectView();
    this.#updateDestinationSelectView();
    this.#updateDatePickerView();
    this.#updatePriceInputView();
    this.#updateOfferSelectView();
    this.#updateDestinationDetailsView();

    this.view.link(pointView).open();
  }

  onTypeSelectChange() {
    const pointType = this.view.typeSelectView.getValue();
    const key = Type.findKey(pointType);

    this.view.destinationSelectView.setLabel(TypeLabel[key]);
    this.#updateOfferSelectView();
  }

  onDestinationSelectChange() {
    this.#updateDestinationDetailsView();
  }
}
