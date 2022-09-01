import RouteView from '../view/route-view';
import PointView from '../view/point-view';
import { formatStringToDate,formatStringToHour} from '../format';
import PlaceholderMessage from '../enum/placeholder-message';
import FilterPredicate from '../enum/filter-predicate';
export default class RoutePresenter {
  constructor(model) {
    this.view = new RouteView();
    this.model = model;
    this.message = new PlaceholderMessage();
  }

  /**
   * @param {PointAdapter} point
   */
  createPointView(point) {
    const destination = this.model.getDestinationById(point.destinationId);
    const offers = this.model.getOffers(point.type, point.offerIds);

    return new PointView(point.id)
      .setDate(formatStringToDate(point.startDate))
      .setTitle(`${point.type} ${destination.name}`)
      .setIcon(point.type)
      .setTimeFrom(formatStringToHour(point.startDate))
      .setTimeTo(formatStringToHour(point.endDate))
      .setPrice(point.basePrice)
      .setOffers(offers.map(
        (offer) => [offer.title, offer.price.toLocaleString()]
      ));
  }

  init() {
    const points = this.model.getPoints();

    this.#addPoints(this.message.EVERYTHING, points);

    document.addEventListener('filter-change', this.onFilterChange.bind(this));
  }

  #addPoints(placeholder, points) {
    if (!points.length) {//приходит ли пустой массив, если нет точек?
      this.view.showPlaceholder(placeholder);
    }
    this.view.setPoints(
      ...points.map(this.createPointView, this));

  }

  //TODO Решение временное. Обработчик вешаю в init Сделала так, чтобы подключить к main. Перенести в презентер фильтра, добавить disabled
  onFilterChange(event) {
    const filter = event.detail;
    const filteredPoints = this.model.getPoints().slice().filter(
      (point) => FilterPredicate[String(filter).toUpperCase()](point)
    );
    this.#addPoints(this.message[filter.toUpperCase()], filteredPoints);
  }
}
