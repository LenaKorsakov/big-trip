import ComponentView, {html} from './component-view.js';

export default class FilterPlaceholderView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('hidden');
  }

  /**
   * @override
   * @param {string} message
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

  toggleVisibility() {
    if (this.сlassList.contains('hidden')) {
      this.classList.remove('hidden');
    } else {
      this.classList.add('hidden');
    }

    return this;
  }
}

customElements.define(String(FilterPlaceholderView), FilterPlaceholderView);
