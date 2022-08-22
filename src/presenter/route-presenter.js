import RouteView from '../view/route-view';
import PointView from '../view/point-view';
import OfferView from '../view/offer-view';
import RouteModel from '../model/points-model';
import OfferToggleView from '../view/offer-toggle-view';
import NoPointsView from '../view/no-points-view';
import { formatStringToDate,formatStringToHour, formatStringToFullFDate} from '../format';
import Message from '../enum/placeholder-message-enum';
import EditorPresenter from './editor-presenter';
export default class RoutePresenter {
  constructor() {
    this.view = new RouteView();
    this.model = new RouteModel();
    this.editorPresenter = new EditorPresenter();
    this.editorView = this.editorPresenter.view;
  }

  /**
   * @param {PointAdapter} point
   */
  createPointView(point) {
    const destination = this.model.getDestinationById(point.destinationId);
    const offers = this.model.getOffers(point.type, point.offerIds);

    const pointView = new PointView()
      .setDate(formatStringToDate(point.startDate))
      .setTitle(`${point.type} ${destination.name}`)
      .setIcon(point.type)
      .setTimeFrom(formatStringToHour(point.startDate))
      .setTimeTo(formatStringToHour(point.endDate))
      .setPrice(point.basePrice)
      .replaceOffers(...offers.map(this.createOfferView, this));

    const availableOfferViews = this.model.getAvailableOffers(point.type)
      .map((availableOffer) =>
        this.createOfferToggleView(availableOffer)
          .setChecked(point.offerIds.includes(availableOffer.id))
      , this);

    pointView.addEventListener('expand', () => {
      this.editorView.close()

        .setDestination(destination.name)
        //.setLable(point.type)
        .setStartTime(formatStringToFullFDate(point.startDate))
        .setEndTime(formatStringToFullFDate(point.endDate))
        .setPrice(point.basePrice)//TODO проверять, есть ли к данному типу point destination.description, pictures,если нет - вместо методов ниже применить скрытие блоков предусмотренными методами
        .setDestinationDescription(destination.description)
        .replacePictures(...destination.pictures.map(this.createPictureView, this))
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

  createOfferToggleView(offer) {
    return new OfferToggleView()
      .setPrice(offer.price)
      .setTitle(offer.title);
  }

  createNoPointsView(filter) {
    return new NoPointsView()
      .setMessage(Message[filter]);
  }

  init() {
    const points = this.model.getPoins();

    if (points.length === 0) {//приходит ли пустой массив, если нет точек?
      this.view.append(this.createNoPointsView('Everything'));
    }
    this.view.append(
      ...points.map(this.createPointView, this));
  }

  //TODO в обработчике события для клика кнопки delete в редакторе предусмотреть проверку RoutView на hasChildNodes()), если их нет, createNoPointsView('Everything')
}
