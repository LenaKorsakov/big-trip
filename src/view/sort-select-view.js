import ComponentView, {html} from './component-view.js';
/** @typedef {[label: string, value: string]} SortOptionState  */

export default class SortSelectView extends ComponentView {
  constructor() {
    super(...arguments);
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <!--sortOptions-->
      </form>
  `;
  }

  /**
   *  * @param {OfferState} state
   *  @override
   */
  createOptionHtml(...state) {
    const [label, value] = state;

    return html`
      <div class="trip-sort__item trip-sort__item--${value}">
        <input
          id="sort-${value}"
          class="trip-sort__input  visually-hidden"
          type="radio"
          name="trip-sort"
          value="${value}"
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

  getValue() {
    return this.querySelector('input:checked').value;
  }

  setValue(value) {
    this.querySelector(`[value="${value}"]`).checked = true;

    return this;
  }

  /**
   * @param {SortOptionState[]} states
   */
  setOptions(states) {
    const htmlOptions = states.map((state) => this.createOptionHtml(...state));

    this.querySelector('.trip-events__trip-sort')
      .insertAdjacentHTML('afterbegin', html`${htmlOptions}`
      );

    return this;
  }

  /**
   * @param {boolean[]} flags
   */
  setOptionsDisabled(flags) {
    const views = this.querySelectorAll('input');
    flags.forEach((flag, index) => {
      views[index].disabled = flag;
    });

    return this;
  }
}

customElements.define(String(SortSelectView), SortSelectView);
