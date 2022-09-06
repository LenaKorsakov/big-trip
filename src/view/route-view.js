import ComponentView, { html } from './component-view.js';
import SortSelectView from './sort-select-view.js';
import NoPointsView from './no-points-view.js';

/**
 * Trip route
 */
export default class RouteView extends ComponentView {
  constructor() {
    super();

    this.classList.add('trip-events__list');

    this.sortView = this.querySelector(String(SortSelectView));
    this.noPointsView = null;
  }

  createAdjacentHtml() {
    return html`
      ${SortSelectView}
    `;
  }

  showPlaceholder(text) {
    this.noPointsView = new NoPointsView(text);
    this.sortView.replaceWith(this.noPointsView);

    return this;
  }

  hidePlaceholder() {
    if (this.noPointsView) {
      this.noPointsView.replaceWith(this.sortView);
      this.noPointsView = null;
    }

    return this;
  }

  hasPoints() {
    return !!this.querySelector('.trip-events__item');
  }

  setPoints(...views) {
    views.forEach((view) => view.classList.add('trip-events__item'));

    super.replaceChildren(...views);

    return this;
  }

}

customElements.define(String(RouteView), RouteView);
