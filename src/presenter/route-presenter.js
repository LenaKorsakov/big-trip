import RouteView from '../view/route-view';
import PointView from '../view/point-view';
import OfferView from '../view/offer-view';
import RouteModel from '../model/route-model';
import NoPointsView from '../view/no-points-view';
import { formatStringToDate,formatStringToHour, formatStringToFullFDate} from '../format';
import PlaceholderMessage from '../enum/placeholder-message';
import EditorPresenter from './editor-presenter';
export default class RoutePresenter {
  constructor() {
    this.view = new RouteView();
    this.model = new RouteModel();
    this.editorPresenter = new EditorPresenter();
    this.editorView = this.editorPresenter.view;
    this.message = new PlaceholderMessage();
  }

  /**
   * @param {PointAdapter} point
   */
  createPointView(point) {
    const destination = this.model.getDestinationById(point.destinationId);
    const offers = this.model.getOffers(point.type, point.offerIds);
    const availableOffers = this.model.getAvailableOffers(point.type);

    const pointView = new PointView()
      .setDate(formatStringToDate(point.startDate))
      .setTitle(`${point.type} ${destination.name}`)
      .setIcon(point.type)
      .setTimeFrom(formatStringToHour(point.startDate))
      .setTimeTo(formatStringToHour(point.endDate))
      .setPrice(point.basePrice)
      .setOffers(offers.map(
        (offer) => [offer.title, offer.price.toLocaleString()]
      ));

    pointView.addEventListener('expand', () => {
      this.editorView.close();

      this.editorView.destinationInputView
        .select(destination.name)
        .setLabel(point.type);

      this.editorView.destinationDetailesView
        .setVisibility(!destination.pictures.length)
        .setDescription(destination.description)
        .setPictures(destination.pictures.map(
          (picture) => [picture.src, picture.description]
        ));

      this.editorView.typeSelectView
        .select(point.type);

      this.editorView.offerSelectView
        .setVisibility(!offers.length)
        .setOffers(offers.map(
          (offer) => [offer.title, offer.price.toLocaleString(), true]
        ).concat(availableOffers.filter(
          (offer) => !point.offerIds.includes(offer.id)
        ).map(
          (offer) => [offer.title, offer.price.toLocaleString(), false]
        )));

      this.editorView.dataPickerView
        .setStartTime(formatStringToFullFDate(point.startDate))
        .setEndTime(formatStringToFullFDate(point.endDate));

      this.editorView.priceInputView
        .setPrice(point.basePrice);

      this.editorView.link(pointView)
        .open();

      this.editorView.addEventListener(
        'delete', () => {pointView.remove();}
      );
      //TODO в обработчике события для клика кнопки delete в редакторе предусмотреть проверку RoutView на hasChildNodes()), если их нет, createNoPointsView('Everything')
    });

    return pointView;
  }

  /**
   * @param {Offer} offer
   */
  createOfferView(offer) {
    return new OfferView()
      .setPrice(offer.price)
      .setTitle(offer.title);
  }

  createNoPointsView() {
    return new NoPointsView()
      .setMessage(this.message.EVERYTHING);
  }

  init() {
    const points = this.model.getPoins();

    if (points.length === 0) {//приходит ли пустой массив, если нет точек?
      this.view.append(this.createNoPointsView());
    }
    this.view.append(
      ...points.map(this.createPointView, this));
  }
}
