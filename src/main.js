import Store from './store/store';

import ApplicationModel from './model/application-model';
import DataTableModel from './model/data-table-model';
import CollectionModel from './model/collection-model';
import FilterPlaceholderModel from './model/filter-placeholder-model';

import DestinationAdapter from './adapter/destination-adapter';
import OfferGroupAdapter from './adapter/offer-group-adapter';
import PointAdapter from './adapter/point-adapter';

import EditorPresenter from './presenter/editor-presenter';
import FilterSelectPresenter from './presenter/filter-select-presenter';
import SortSelectPresenter from './presenter/sort-select-presenter';
import PointListPresenter from './presenter/point-list-presenter';
import FilterPlaceholderPresenter from './presenter/filter-placeholder-presentor';

import PointListView from './view/point-list-view';
import EditorView from './view/editor-view';
import FilterSelectView from './view/filter-select-view';
import SortSelectView from './view/sort-select-view';
import FilterPlaceholderView from './view/filter-placeholder-view';

import FilterPredicate from './enum/filter-predicate';
import SortCompare from './enum/sort-compare';
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
  .setFilter(FilterPredicate.EVERYTHING)
  .setSort(SortCompare.DAY);

const destinations = new CollectionModel(destinationStore, (destination) => new DestinationAdapter(destination));

const offerGroups = new CollectionModel(offersStore, (offerGroup) => new OfferGroupAdapter(offerGroup));

const applicationModel = new ApplicationModel(points, destinations, offerGroups);
const filterPlaceholderModel = new FilterPlaceholderModel(pointStore, (point) => new PointAdapter(point));


/** @type {PointListView} */
const pointListView = document.querySelector(String(PointListView));
/** @type {FilterSelectView} */
const filterSelectView = document.querySelector(String(FilterSelectView));
/** @type {SortSelectView} */
const sortSelectView = document.querySelector(String(SortSelectView));
/** @type {SortSelectView} */
const filterPlaceholderView = document.querySelector(String(FilterPlaceholderView));

applicationModel.ready().then(() => {
  new PointListPresenter(applicationModel, pointListView);
  new EditorPresenter(applicationModel, new EditorView());
  new FilterSelectPresenter(applicationModel, filterSelectView);
  new SortSelectPresenter(applicationModel, sortSelectView);
  new FilterPlaceholderPresenter(filterPlaceholderModel,filterPlaceholderView);
});

// Object.assign(globalThis, {
//   applicationModel,
//   FilterPredicate: FilterCallback,
//   SortCompare: SortCallback
// });
