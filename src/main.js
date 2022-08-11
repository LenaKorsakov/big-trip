import FiltersView from './view/filters-view';
import { render } from './render';

const siteHeaderElement = document.querySelector('.page-header');

render(new FiltersView, siteHeaderElement);
