import Store from './store/store';

import RouteModel from './model/route-model';
import './view/filter-select-view';

import RoutePresenter from './presenter/route-presenter';
import EditorPresenter from './presenter/editor-presenter';
import FilterSelectPresenter from './presenter/filter-select-presenter';
import SortSelectPresenter from './presenter/sort-select-presenter';
import DataTableModel from './model/data-table-model';
import PointAdapter from './adapter/point-adapter';
import FilterCallback from './enum/filter-callback';
import SortCallback from './enum/sort-callback';
import CollectionModel from './model/collection-model';
import DestinationAdapter from './adapter/destination-adapter';
import OfferGroupAdapter from './adapter/offer-group-adapter';
import ApplicationModel from './model/application-model';


const BASE_URL = 'https://18.ecmascript.pages.academy/big-trip';
const POINTS_URL = `${BASE_URL}/points`;
const DESTINATIONS_URL = `${BASE_URL}/destinations`;
const OFFERS_URL = `${BASE_URL}/offers`;
const AUTH = 'Basic er883lsjlfskjls';

/** @type {Store<Point>}*/
const pointStore = new Store(POINTS_URL, AUTH);

/** @type {Store<Destination>}*/
const destinationStore = new Store(DESTINATIONS_URL, AUTH);

/** @type {Store<OfferGroup}*/
const offersStore = new Store(OFFERS_URL, AUTH);

const points = new DataTableModel(pointStore, (point) => new PointAdapter(point))
  .setFilter(FilterCallback.FUTURE)
  .setSort(SortCallback.PRICE);

const destinations = new CollectionModel(destinationStore, (destination) => new DestinationAdapter(destination));

const offerGroups = new CollectionModel(offersStore, (offerGroup) => new OfferGroupAdapter(offerGroup));

const applicationModel = new ApplicationModel(points, destinations, offerGroups);
applicationModel.ready().then(() => {
  console.log('Все ок');
});

const routeContainerView = document.querySelector('.trip-events');

const model = new RouteModel();
const routePresenter = new RoutePresenter(model);

routePresenter.init();
routeContainerView.append(routePresenter.view);

new EditorPresenter(model);
new FilterSelectPresenter(model);
new SortSelectPresenter(model);


