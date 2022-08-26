import ComponentView from './component-view.js';

/** @typedef {import('../enum/type-label').default} TypeLabel */

/**
 * Trip route
 */
export default class RouteView extends ComponentView {
  constructor() {
    super();

    this.classList.add('trip-events__list');
  }

  // createAdjacentHtml() {
  //   return html`
  //     <!-- H2
  //     Message (...Loading)
  //     Div(контейнер списка) -->
  //   `;
  // }

  // showPlaceholder(text) {

  // }

  // hidePlaceholder() {
  //   //вернуть сортировку
  // }

  /**
   * Oбертка для существующего метода append, которая добавляет класс всем элементам перед их вставкой
   * @override
   */
  //setPoints
  append(...views) {
    views.forEach((view) => view.classList.add('trip-events__item'));

    super.append(...views);

    return this;
  }

}

customElements.define(String(RouteView), RouteView);
