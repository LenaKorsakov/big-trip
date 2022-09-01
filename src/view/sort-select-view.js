import ComponentView, {html} from './component-view.js';
import SortOptionView from './sort-options-view.js';

/**
 * View сортировки
 */
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

  select(value) {
    this.querySelector(`[value="sort-${value}"]`).checked = true;

    return this;
  }

  /**
   * @param {[string, string][]} states
   */
  setOptions(states) {
    const views = states.map((state) => new SortOptionView(...state));

    this.querySelector('.trip-events__trip-sort').append(...views);

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
