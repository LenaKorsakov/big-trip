import RouteView from '../view/route-view';
import PointView from '../view/point-view';
import OfferView from '../view/offer-view';
import PointEditorView from '../view/point-editor-view';
import AggregatedPointsModel from '../model.js/points-model';
import { formatStringToDate,formatStringToHour } from '../format';

export default class RoutePresenter {
  constructor() {
    this.view = new RouteView();
    this.model = new AggregatedPointsModel();
  }

  createPointView(point) {

    return new PointView()
      .setDate(formatStringToDate(point.dateFrom))
      .setTitle(`${point.destination.name} ${point.type}`)
      .setIcon(point.type)
      .setTimeFrom(formatStringToHour(point.dateFrom))
      .setTimeTo(formatStringToHour(point.dateTo))
      .setPrice(point.basePrice)
      .addOffer(...point.offers.map(this.createOfferView, this));
  }

  createOfferView(offer) {
    return new OfferView()
      .setOfferPrice(offer.price)
      .setOfferTitle(offer.title);
  }

  init() {
    const points = this.model.get();
    this.view.append(
      new PointEditorView(),
      ...points.map(this.createPointView, this)
    );
  }
}
