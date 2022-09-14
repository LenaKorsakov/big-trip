import Presenter from './presenter';
import Type from '../enum/type';
import TypeLabel from '../enum/type-label';
import Mode from '../enum/mode';
import PointAdapter from '../adapter/point-adapter';

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

    this.#buildDatePickerView();
    this.#buildTypeSelectView();
    this.#buildDestinationSelectView();

    this.view.addEventListener('close', this.onViewClose.bind(this));
    this.view.addEventListener('reset', this.onViewReset.bind(this));
    this.view.addEventListener('submit', this.onViewSubmit.bind(this));


    this.view.typeSelectView.addEventListener('change',this.onViewTypeSelectChange.bind(this));
    this.view.destinationSelectView.addEventListener('change', this.onViewDestinationSelectChange.bind(this));

    this.model.addEventListener('mode',this.onModelMode.bind(this));
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
    const DATE_FORMAT = 'd/m/y H:m';

    const options = {
      dateFormat: DATE_FORMAT,
      locale: {firstDayOfWeek: 1},
    };
    this.view.dataPickerView
      .configure(options)
      .setDates('today');
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
    const {startDate, endDate} = this.model.editablePoint;

    this.view.dataPickerView.setDates(startDate, endDate);
  }

  #updatePriceInputView() {
    this.view.priceInputView.setPrice(this.model.editablePoint.basePrice);
  }

  #updateOfferSelectView() {
    const selectedType = this.view.typeSelectView.getValue();
    const availableOffers = this.model.offerGroups.findById(selectedType).items;

    const offers = availableOffers.map((offer) => [offer.title, offer.price, offer.id, this.model.editablePoint.offerIds.includes(offer.id)]);

    this.view.offerSelectView
      .set('hidden', !availableOffers.length)
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
      .set('hidden', !destination.pictures.length)
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

  onViewTypeSelectChange() {
    const pointType = this.view.typeSelectView.getValue();
    const key = Type.findKey(pointType);

    this.view.destinationSelectView.setLabel(TypeLabel[key]);
    this.#updateOfferSelectView();
  }

  onViewDestinationSelectChange() {
    this.#updateDestinationDetailsView();
  }

  onViewClose() {
    this.model.setMode(Mode.VIEW);
  }

  async onViewReset() {
    this.view.toggleDisabledButton('reset', true, 'Deleting...');

    try {
      await this.model.points.remove(this.model.editablePoint.id);

      this.view.toggleDisabledButton('reset', false, 'Delete');
      this.view.close();
    }

    catch (exception) {
      //TODO эффект покачивания
      this.view.toggleDisabledButton('reset', false, 'Delete');
    }
  }

  async onViewSubmit() {
    this.view.toggleDisabledButton('submit', true, 'Saving...');

    try {
      await this.model.points.update(this.model.editablePoint.id, this.getFormData());

      this.view.toggleDisabledButton('submit', false, 'Save');
      this.view.close();
    }

    catch (exception) {
      //TODO эффект покачивания
      this.view.toggleDisabledButton('submit', false, 'Save');
    }
  }

  getFormData() {
    const point = new PointAdapter();
    const destinationName = this.view.destinationSelectView.getValue();
    const [startDate, endDate] = this.view.dataPickerView.getDates();

    point.basePrice = Number(this.view.priceInputView.getPrice());
    point.startDate = startDate;
    point.endDate = endDate;
    point.destinationId = this.model.destinations.findBy('name', destinationName)?.id;
    point.id = this.model.editablePoint.id;
    point.offerIds = this.view.offerSelectView.getSelectedValues().map(Number);
    point.type = this.view.typeSelectView.getValue();
    point.isFavorite = false;

    return point;
  }
}
