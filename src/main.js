import Store from './store/store';

import ApplicationModel from './model/application-model';
import CollectionModel from './model/collection-model';
import DataTableModel from './model/data-table-model';

import PointAdapter from './adapter/point-adapter';
import DestinationAdapter from './adapter/destination-adapter';
import OfferGroupAdapter from './adapter/offer-group-adapter';

import CreateButtonPresenter from './presenter/create-button-presenter';
import FilterPresenter from './presenter/filter-presenter';
import SortPresenter from './presenter/sort-presenter';
import PlaceholderPresenter from './presenter/placeholder-presenter';
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


const BASE_URL = 'https://18.ecmascript.pages.academy/big-trip';
const POINTS_URL = `${BASE_URL}/points`;
const DESTINATIONS_URL = `${BASE_URL}/destinations`;
const OFFERS_URL = `${BASE_URL}/offers`;
const AUTH = 'Basic 5ohslhls77';


/** @type {Store<Point>}*/
const pointsStore = new Store(POINTS_URL, AUTH);

/** @type {Store<Destination>}*/
const destinationsStore = new Store(DESTINATIONS_URL, AUTH);

/** @type {Store<OfferGroup>}*/
const offerGroupsStore = new Store(OFFERS_URL, AUTH);


const pointsModel = new DataTableModel(pointsStore, (item) => new PointAdapter(item))
  .setFilter(FilterPredicate.EVERYTHING)
  .setSort(SortCompare.DAY);

const destinationsModel = new CollectionModel(destinationsStore, (item) => new DestinationAdapter(item));

const offerGroupsModel = new CollectionModel(offerGroupsStore, (item) => new OfferGroupAdapter(item));

const applicationModel = new ApplicationModel(pointsModel, destinationsModel, offerGroupsModel);


/** @type {ListView} */
const listView = document.querySelector(String(ListView));

/** @type {FilterView} */
const filterView = document.querySelector(String(FilterView));

/** @type {SortView} */
const sortView = document.querySelector(String(SortView));

/** @type {HTMLParagraphElement} */
const placeholderView = document.querySelector('.trip-events__msg');

/** @type {HTMLButtonElement} */
const createButtonView = document.querySelector('.trip-main__event-add-btn');


applicationModel.ready().then(() => {
  new CreateButtonPresenter(applicationModel, createButtonView);
  new FilterPresenter(applicationModel, filterView);
  new SortPresenter(applicationModel, sortView);
  new CreatorPresenter(applicationModel, new CreatorView().target(listView));
  new EditorPresenter(applicationModel, new EditorView());
  new PlaceholderPresenter(applicationModel,placeholderView);
  new ListPresenter(applicationModel, listView);
});
