import RoutePresenter from './presenter/route-presenter';
import './view/filter-view';
import './view/sort-view';

const routeContainerView = document.querySelector('.trip-events');
const routePresenter = new RoutePresenter();

routePresenter.init();
routeContainerView.append(routePresenter.view);
