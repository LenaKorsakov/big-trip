import ComponentView, {html} from './component-view.js';

/**
 * View сообщения с приглашением добавить первую точку маршрута
 */
export default class NoPointsView extends ComponentView {
  constructor() {
    super(...arguments);
  }

  /**
   * @override
   */
  createAdjacentHtml(message = 'Loading...') {
    return html`
      <p class="trip-events__msg">${message}</p>

        <!--
          Значение отображаемого текста зависит от выбранного фильтра:
            * Everthing – 'Click New Event to create your first point'
            * Future — 'There are no future events now'.
        -->
      `;
  }
}

customElements.define(String(NoPointsView), NoPointsView);
