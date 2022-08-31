import EditorView from '../view/editor-view';
import Type from '../enum/type';
import TypeLabel from '../enum/type-label';
import { formatStringToFullFDate} from '../format';
export default class EditorPresenter {
  constructor(model) {
    this.view = new EditorView();
    this.model = model;

    const destinations = this.model.getAvailableDestinations();
    const typeOptions = Object.keys(Type).map((key) => [TypeLabel[key], Type[key]]);
    const {typeSelectView, destinationSelectView: destinationInputView} = this.view;

    typeSelectView
      .setOptions(typeOptions)
      .select(Type.TAXI);

    destinationInputView
      .setOptions(destinations.map((destination) => ['', destination.name]));

    typeSelectView.addEventListener('select', this.onTypeSelect.bind(this));

    destinationInputView.addEventListener('select', this.onDestinationSelect.bind(this));

    document.addEventListener('point-edit', this.onPointEdit.bind(this));
  }

  #setDestinationBlock(destination) {
    this.view.destinationDetailsView
      .setVisibility(!destination.pictures.length)
      .setDescription(destination.description)
      .setPictures(destination.pictures.map(
        (picture) => [picture.src, picture.description]
      ));
  }

  #setOffersBlock(offers, availableOffers, point) {
    this.view.offerSelectView
      .setVisibility(!availableOffers.length)
      .setOffers(offers.map(
        (offer) => [offer.title, offer.price.toLocaleString(), true]
      ).concat(availableOffers.filter(
        (offer) => !point.offerIds.includes(offer.id)
      ).map(
        (offer) => [offer.title, offer.price.toLocaleString(), false]
      )));
  }

  onPointEdit(event) {
    const point = this.model.getPointById(event.detail);
    const destination = this.model.getDestinationById(point.destinationId);
    const availableOffers = this.model.getAvailableOffers(point.type);
    const offers = this.model.getOffers(point.type, point.offerIds);

    this.view.close();

    this.view.destinationSelectView
      .setValue(destination.name)
      .setLabel(point.type);

    this.#setDestinationBlock(destination);

    this.view.typeSelectView
      .select(point.type);

    this.#setOffersBlock(offers, availableOffers, point);

    this.view.dataPickerView
      .setStartTime(formatStringToFullFDate(point.startDate))
      .setEndTime(formatStringToFullFDate(point.endDate));

    this.view.priceInputView
      .setPrice(point.basePrice);

    this.view.link(event.target)
      .open();
  }

  onTypeSelect(event) {
    const pointType = event.detail;
    const labelKey = Type.resolveKey(pointType);
    const offers = this.model.getAvailableOffers(pointType);
    const offerStates = offers.map(
      (offer) => [offer.title, offer.price.toLocaleString(), false]
    );

    this.view.destinationSelectView.setLabel(TypeLabel[labelKey]);

    this.view.offerSelectView
      .setVisibility(!offers.length)
      .setOffers(offerStates);
  }

  onDestinationSelect(event) {
    const destination = this.model.getDestinationByName(event.target.getValue());
    const pictureStates = destination.pictures.map(
      (picture) => [picture.src, picture.description]
    );

    this.view.destinationDetailsView
      .setVisibility(!destination.pictures.length)
      .setPictures(pictureStates)
      .setDescription(destination.description);
  }
}
