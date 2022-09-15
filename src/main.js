import Store from './store/store';

import ApplicationModel from './model/application-model';
import CollectionModel from './model/collection-model';
import DataTableModel from './model/data-table-model';

import PointAdapter from './adapter/point-adapter';
import DestinationAdapter from './adapter/destination-adapter';
import OfferGroupAdapter from './adapter/offer-group-adapter';

import NewPointButtonPresenter from './presenter/new-point-button-presenter';
import FilterSelectPresenter from './presenter/filter-select-presenter';
import SortSelectPresenter from './presenter/sort-select-presenter';
import PlaceholderPresenter from './presenter/filter-placeholder-presentor';
import PointListPresenter from './presenter/point-list-presenter';
import EditorPresenter from './presenter/editor-presenter';

import FilterSelectView from './view/filter-select-view';
import SortSelectView from './view/sort-select-view';
import PointListView from './view/point-list-view';
import EditorView from './view/editor-view';

import FilterPredicate from './enum/filter-predicate';
import SortCompare from './enum/sort-compare';
import Mode from './enum/mode';

//import {getRandomCombination} from './utils';

const BASE_URL = 'https://18.ecmascript.pages.academy/big-trip';
const POINTS_URL = `${BASE_URL}/points`;
const DESTINATIONS_URL = `${BASE_URL}/destinations`;
const OFFERS_URL = `${BASE_URL}/offers`;
//const HEADER_LENGTH = 11;
//const AUTH = `Basic ${getRandomCombination(HEADER_LENGTH)}`;
const AUTH = 'Basic 60jd12k5';


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


/** @type {PointListView} */
const pointListView = document.querySelector(String(PointListView));

/** @type {FilterSelectView} */
const filterSelectView = document.querySelector(String(FilterSelectView));

/** @type {SortSelectView} */
const sortSelectView = document.querySelector(String(SortSelectView));

/** @type {PlaceholdersView} */
const placeholderView = document.querySelector('.trip-events__msg');

/** @type {HTMLButtonElement} */
const newPointButtonView = document.querySelector('.trip-main__event-add-btn');

applicationModel.ready().then(() => {
  new NewPointButtonPresenter(applicationModel, newPointButtonView);
  new FilterSelectPresenter(applicationModel, filterSelectView);
  new SortSelectPresenter(applicationModel, sortSelectView);
  new PlaceholderPresenter(applicationModel,placeholderView);
  new PointListPresenter(applicationModel, pointListView);
  new EditorPresenter(applicationModel, new EditorView());
});

const {group, groupEnd, trace} = console;

applicationModel.addEventListener('mode', () => {
  groupEnd();
  group(`Mode[${Mode.findKey(applicationModel.getMode())}]`);
});

applicationModel.points.addEventListener(['add', 'update', 'remove', 'filter', 'sort'], (event) => {
  trace(event.type);
});
