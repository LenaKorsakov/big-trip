import RouteView from '../view/route-view';
import EventView from '../view/event-view';
import OfferView from '../view/offer-view';
import EventEditorView from '../view/event-editor-view';

export default class RoutePresenter {
  model = null;
  view = new RouteView();

  createEventView() {
    return new EventView().addOffer(this.createOfferView());
  }

  createOfferView() {
    return new OfferView();
  }

  init() {
    // TODO get points from route model
    this.view.append(
      new EventEditorView(),
      ...new Array(3).fill().map(this.createEventView, this)
    );
  }
}
