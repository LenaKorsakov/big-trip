import ComponentView, {html} from './component-view.js';
/** @typedef {[label: string, value: string]} FilterOptionState  */

export default class FilterSelectView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('trip-controls__filters');
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
        <h2 class="visually-hidden">Filter events</h2>
        <form class="trip-filters" action="#" method="get">
          <button class="visually-hidden" type="submit">Accept filter</button>
        </form>
    `;
  }

  /**
   *
   * @param  {FilterOptionState} state
   */
  createOptionHtml(...state) {
    const [label, value] = state;

    return html`
      <div class="trip-filters__filter">
        <input
          id="filter-${value}"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="${value}"
        >
        <label
          class="trip-filters__filter-label"
          for="filter-${value}"
        >
          ${label}
        </label>
      </div>
    `;
  }

  /**
   * @param {FilterOptionState[]} states
   */
  setOptions(states) {
    const htmlOptions = states.map((state) => this.createOptionHtml(...state));

    this.querySelector('button')
      .insertAdjacentHTML('beforebegin', html`${htmlOptions}`
      );

    return this;
  }

  getValue() {
    return this.querySelector('input:checked').value;
  }

  setValue(value) {
    this.querySelector(`[value="${value}"]`).checked = true;

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

customElements.define(String(FilterSelectView), FilterSelectView);
