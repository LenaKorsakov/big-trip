import FiltersView from './view/filters-view';
import SortView from './view/sort-views';
import RoadPresenter from './presenter/presenter-road';
import { render } from './render';

const siteFiltersElement = document.querySelector('.trip-controls__filters');
const siteRoadContainerElement = document.querySelector('.trip-events');
const roadPresenter = new RoadPresenter();

render(new FiltersView(), siteFiltersElement);
render(new SortView(), siteRoadContainerElement,'afterbegin');

roadPresenter.init(siteRoadContainerElement);
