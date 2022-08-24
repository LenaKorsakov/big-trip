import EditorView from '../view/editor-view';
import RouteModel from '../model/route-model';
export default class EditorPresenter {
  constructor() {
    this.view = new EditorView();
    this.model = new RouteModel();

    const destinations = this.model.getAvailableDestinations();

    const {typeSelectView, destinationDetailesView, destinationInputView, offerSelectView} = this.view;
    typeSelectView
      .setOptions([
        ['Taxi', 'taxi'],
        ['Bus', 'bus'],
        ['Flight', 'flight'],
        ['Sightseeing', 'sightseeing'],
        ['Restaurant', 'restaurant'],
        ['Ship', 'ship'],
      ])
      .select('taxi');

    destinationInputView
      .setOptions(destinations.map((destination) => destination.name))
      .select('Paris');

    typeSelectView.addEventListener('labelChanged', (event) => {
      destinationInputView.setLabel(event.detail.value);

      if (this.model.getAvailableOffers(event.detail.value).length !== 0) {

        offerSelectView.replaceOffers(this.model.getAvailableOffers(event.detail.value));
      } else {
        offerSelectView.hide();
      }
    });

    destinationInputView.addEventListener('destinationChanged', (event) => {

      if(this.model.getDestinationByName(event.detail.value).pictures.length !== 0) {

        destinationDetailesView.replacePictures(...this.model.getDestinationByName(event.detail.value).pictures);
        destinationDetailesView.setDescription(this.model.getDestinationByName(event.detail.value).description);
      } else {
        destinationDetailesView.hide();
      }
    });
  }
}
