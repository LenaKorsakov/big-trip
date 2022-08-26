import EditorView from '../view/editor-view';
import RouteModel from '../model/route-model';
import Type from '../enum/type';
import TypeLabel from '../enum/type-label';
export default class EditorPresenter {
  constructor() {
    this.view = new EditorView();
    this.model = new RouteModel();

    const destinations = this.model.getAvailableDestinations();

    const typeOptions = Object.keys(Type).map((key) => [TypeLabel[key], Type[key]]);
    const {typeSelectView, destinationDetailesView, destinationInputView, offerSelectView} = this.view;

    typeSelectView
      .setOptions(typeOptions)
      .select(Type.BUS);

    destinationInputView
      .setOptions(destinations.map((destination) => ['', destination.name]))
      .select('Paris');

    typeSelectView.addEventListener('select', (event) => {
      const pointType = event.detail;
      const labelKey = Type.resolveKey(pointType);

      destinationInputView.setLabel(TypeLabel[labelKey]);

      const offers = this.model.getAvailableOffers(pointType);
      const offerStates = offers.map(
        (offer) => [offer.title, offer.price.toLocaleString(), false]
      );

      offerSelectView
        .setVisibility(!offers.length)
        .setOffers(offerStates);
    });

    destinationInputView.addEventListener('select', (event) => {
      const destination = this.model.getDestinationByName(event.detail);
      const pictureStates = destination.pictures.map(
        (picture) => [picture.src, picture.description]
      );

      destinationDetailesView
        .setVisibility(!destination.pictures.length)
        .setPictures(pictureStates)
        .setDescription(destination.description);
    });
  }
}
