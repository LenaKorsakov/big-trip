import ComponentView, {html} from './component-view.js';
import FilterOptionView from './filter-option-view.js';

/**
 * View фильтра
 */
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
   * @param {[string, string][]} states
   */
  setOptions(states) {
    const views = states.map((state) => new FilterOptionView(...state));

    this.querySelector('button').before(...views);

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

/**
 * Теперь для любых HTML-элементов с тегом <trip-filter-select> создаётся экземпляр FilterView и вызываются его методы
 */
customElements.define(String(FilterSelectView), FilterSelectView);
