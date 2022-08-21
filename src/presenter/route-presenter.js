import RouteView from '../view/route-view';
import PointView from '../view/point-view';
import OfferView from '../view/offer-view';
import PointEditorView from '../view/point-editor-view';
import PointsModel from '../model/points-model';
import OfferToggleView from '../view/offer-toggle-view';
import { formatStringToDate,formatStringToHour, formatStringToFullFDate} from '../format';
export default class RoutePresenter {
  constructor() {
    this.view = new RouteView();
    this.model = new PointsModel();
    this.editorView = new PointEditorView();
  }

  /**
   * @param {Point} point
   */
  createPointView(point) {

    const pointView = new PointView()
      .setDate(formatStringToDate(point.date_from))
      .setTitle(`${point.type} ${point.destination.name}`)
      .setIcon(point.type)
      .setTimeFrom(formatStringToHour(point.date_from))
      .setTimeTo(formatStringToHour(point.date_to))
      .setPrice(point.basePrice)
      .replaceOffers(...point.offers.map(this.createOfferView, this));

    const addedOffersIds = point.offers.map((offer) => offer.id);
    const availableOfferViews = this.model.getAvailableOffers(point.type)
      .map((availableOffer) =>
        this.createOfferEditorView(availableOffer)
          .setChecked(addedOffersIds.includes(availableOffer.id))
      , this);

    pointView.addEventListener('expand', () => {
      this.editorView.close()

        .setDestination(point.destination.name)
        .setLable(point.type)
        .setStartTime(formatStringToFullFDate(point.date_from))
        .setEndTime(formatStringToFullFDate(point.date_to))
        .setPrice(point.base_price)
        .setDestinationDescription(point.destination.description)
        .replacePictures(...point.destination.pictures.map(this.createPictureView, this))
        .replaceOffers(...availableOfferViews)

        .link(pointView)
        .open();

    });

    return pointView;
  }

  /**
   * @param {Picture} picture
   */
  createPictureView(picture) {
    const view = new Image();

    view.src = picture.src;
    view.className = 'event__photo';
    view.alt = picture.description;

    return view;
  }

  /**
   * @param {Offer} offer
   */
  createOfferView(offer) {
    return new OfferView()
      .setPrice(offer.price)
      .setTitle(offer.title);
  }

  createOfferEditorView(offer) {
    return new OfferToggleView()
      .setPrice(offer.price)
      .setTitle(offer.title);
  }

  init() {
    const points = this.model.get();
    this.view.append(
      ...points.map(this.createPointView, this)
    );
  }
}
