import RoutePresenter from './presenter/route-presenter';
import RouteModel from './model/route-model';
import EditorPresenter from './presenter/editor-presenter';
import './view/filter-select-view';
import FilterSelectPresenter from './presenter/filter-select-presenter';
import SortSelectPresenter from './presenter/sort-select-presenter';

const routeContainerView = document.querySelector('.trip-events');

const model = new RouteModel();
const routePresenter = new RoutePresenter(model);

routePresenter.init();
routeContainerView.append(routePresenter.view);

new EditorPresenter(model);
new FilterSelectPresenter(model);
new SortSelectPresenter(model);
