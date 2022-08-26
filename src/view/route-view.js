import ComponentView from './component-view.js';

/**
 * Trip route
 */
export default class RouteView extends ComponentView {
  constructor() {
    super();

    this.classList.add('trip-events__list');
  }

  /**
   * Oбертка для существующего метода append, которая добавляет класс всем элементам перед их вставкой
   * @override
   */
  append(...views) {
    views.forEach((view) => view.classList.add('trip-events__item'));

    super.append(...views);

    return this;
  }

}

customElements.define('trip-route', RouteView);
