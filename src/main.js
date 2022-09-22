import Store from './store/store';

import ApplicationModel from './model/application-model';
import CollectionModel from './model/collection-model';
import DataTableModel from './model/data-table-model';

import PointAdapter from './adapter/point-adapter';
import DestinationAdapter from './adapter/destination-adapter';
import OfferGroupAdapter from './adapter/offer-group-adapter';

import NewPointButtonPresenter from './presenter/new-point-button-presenter';

import FilterPresenter from './presenter/filter-presenter';
import SortPresenter from './presenter/sort-presenter';
import PlaceholderPresenter from './presenter/placeholder-presentor';
import ListPresenter from './presenter/list-presenter';
import CreatorPresenter from './presenter/creator-presenter';
import EditorPresenter from './presenter/editor-presenter';

import FilterView from './view/filter-view';
import SortView from './view/sort-view';
import ListView from './view/list-view';
import CreatorView from './view/creator-view';
import EditorView from './view/editor-view';

import FilterPredicate from './enum/filter-predicate';
import SortCompare from './enum/sort-compare';
import Mode from './enum/mode';

const BASE_URL = 'https://18.ecmascript.pages.academy/big-trip';
const POINTS_URL = `${BASE_URL}/points`;
const DESTINATIONS_URL = `${BASE_URL}/destinations`;
const OFFERS_URL = `${BASE_URL}/offers`;
const AUTH = 'Basic 60jd12k5';

/** @type {Store<Point>}*/
const pointStore = new Store(POINTS_URL, AUTH);

/** @type {Store<Destination>}*/
const destinationStore = new Store(DESTINATIONS_URL, AUTH);

/** @type {Store<OfferGroup>}*/
const offersStore = new Store(OFFERS_URL, AUTH);

const pointsModel = new DataTableModel(pointStore, (point) => new PointAdapter(point))
  .setFilter(FilterPredicate.EVERYTHING)
  .setSort(SortCompare.DAY);

const destinationsModel = new CollectionModel(destinationStore, (destination) => new DestinationAdapter(destination));

const offerGroupsModel = new CollectionModel(offersStore, (offerGroup) => new OfferGroupAdapter(offerGroup));

const applicationModel = new ApplicationModel(pointsModel, destinationsModel, offerGroupsModel);


/** @type {ListView} */
const pointListView = document.querySelector(String(ListView));

/** @type {FilterView} */
const filterView = document.querySelector(String(FilterView));

/** @type {SortView} */
const sortView = document.querySelector(String(SortView));

/** @type {HTMLParagraphElement} */
const placeholderView = document.querySelector('.trip-events__msg');

/** @type {HTMLButtonElement} */
const newPointButtonView = document.querySelector('.trip-main__event-add-btn');

/** @type {CreatorView} */
const creatorView = new CreatorView().target(pointListView);

applicationModel.ready().then(() => {
  new NewPointButtonPresenter(applicationModel, newPointButtonView);
  new FilterPresenter(applicationModel, filterView);
  new SortPresenter(applicationModel, sortView);
  new PlaceholderPresenter(applicationModel,placeholderView);
  new ListPresenter(applicationModel, pointListView);
  new EditorPresenter(applicationModel, new EditorView());
  new CreatorPresenter(applicationModel, creatorView);
});

const {trace} = console;

applicationModel.addEventListener('mode', () => {
  trace(`%cMode.${Mode.findKey(applicationModel.getMode())}`, 'background: pink');
});

pointsModel.addEventListener(['add', 'update', 'remove', 'filter', 'sort'], (event) => {
  trace(`%c${event.type}`, 'background: yellow');
});

