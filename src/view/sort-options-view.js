import ComponentView, {html} from './component-view.js';

export default class SortOptionView extends ComponentView {
  constructor() {
    super(...arguments);

    this.style.display = 'block';
  }

  /**
   * @override
   */
  createAdjacentHtml(label, value) {
    return html`
    <div class ="trip-sort__item trip-sort__item--${value}">
    <input
     id="sort-${value}"
      class="trip-sort__input  visually-hidden"
      type="radio"
      name="trip-sort"
      value="sort-${value}"
    >
    <label
      class="trip-sort__btn"
      for="sort-${value}"
    >
      ${label}
    </label>
  </div>
    `;
  }
}

customElements.define(String(SortOptionView), SortOptionView);
