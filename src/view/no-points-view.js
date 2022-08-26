import ComponentView, {html} from './component-view.js';

/**
 * View сообщения с приглашением добавить первую точку маршрута
 */
export default class NoPointsView extends ComponentView {
  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
      <p class="trip-events__msg">Click New Event to create your first point</p>

        <!--
          Значение отображаемого текста зависит от выбранного фильтра:
            * Everthing – 'Click New Event to create your first point'
            * Past — 'There are no past events now';
            * Future — 'There are no future events now'.
        -->
      `;
  }

  /**
   * @param {string} message
   */
  setMessage(message) {
    this.querySelector('p').textContent = message;

    return this;
  }
}

customElements.define('trip-no-points', NoPointsView);
