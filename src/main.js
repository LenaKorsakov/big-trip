import Store from './store/store';

import RouteModel from './model/route-model';
import ApplicationModel from './model/application-model';
import DataTableModel from './model/data-table-model';
import CollectionModel from './model/collection-model';

import DestinationAdapter from './adapter/destination-adapter';
import OfferGroupAdapter from './adapter/offer-group-adapter';
import PointAdapter from './adapter/point-adapter';

//import RoutePresenter from './presenter/route-presenter';
import EditorPresenter from './presenter/editor-presenter';
import FilterSelectPresenter from './presenter/filter-select-presenter';
import SortSelectPresenter from './presenter/sort-select-presenter';
import PointListPresenter from './presenter/point-list-presenter';

import PointListView from './view/point-list-view';

import FilterCallback from './enum/filter-callback';
import SortCallback from './enum/sort-callback';
import {getRandomHeader} from './utils';

const BASE_URL = 'https://18.ecmascript.pages.academy/big-trip';
const POINTS_URL = `${BASE_URL}/points`;
const DESTINATIONS_URL = `${BASE_URL}/destinations`;
const OFFERS_URL = `${BASE_URL}/offers`;
const HEADER_LENGTH = 11;
const AUTH = `Basic ${getRandomHeader(HEADER_LENGTH)}`;


/** @type {Store<Point>}*/
const pointStore = new Store(POINTS_URL, AUTH);

/** @type {Store<Destination>}*/
const destinationStore = new Store(DESTINATIONS_URL, AUTH);

/** @type {Store<OfferGroup}*/
const offersStore = new Store(OFFERS_URL, AUTH);

const points = new DataTableModel(pointStore, (point) => new PointAdapter(point))
  .setFilter(FilterCallback.EVERYTHING)
  .setSort(SortCallback.DAY);

const destinations = new CollectionModel(destinationStore, (destination) => new DestinationAdapter(destination));

const offerGroups = new CollectionModel(offersStore, (offerGroup) => new OfferGroupAdapter(offerGroup));

const applicationModel = new ApplicationModel(points, destinations, offerGroups);


/** @type {PointListView} */
const pointListView = document.querySelector(String(PointListView));

applicationModel.ready().then(() => {
  new PointListPresenter(applicationModel, pointListView);
  //TODO остальные
});

Object.assign(globalThis, {
  applicationModel,
  FilterCallback,
  SortCallback
});

//const routeContainerView = document.querySelector('.trip-events');

const model = new RouteModel();
//const routePresenter = new RoutePresenter(model);

//routePresenter.init();
//routeContainerView.append(routePresenter.view);

new EditorPresenter(model);
new FilterSelectPresenter(model);
new SortSelectPresenter(model);


