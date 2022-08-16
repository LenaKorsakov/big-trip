import RouteView from '../view/route-view';
import PointView from '../view/point-view';
import OfferView from '../view/offer-view';
import PointEditorView from '../view/point-editor-view';

export default class RoutePresenter {
  model = null;
  view = new RouteView();

  createPointView() {
    return new PointView().addOffer(this.createOfferView());
  }

  createOfferView() {
    return new OfferView();
  }

  init() {
    // TODO get points from route model
    this.view.append(
      new PointEditorView(),
      ...new Array(3).fill().map(this.createPointView, this)
    );
  }
}
