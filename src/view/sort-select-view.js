import ComponentView, {html} from './component-view.js';
import SortOptionView from './sort-options-view.js';

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

  getValue() {
    return this.querySelector('input:checked').value;
  }

  setValue(value) {
    this.querySelector(`[value="${value}"]`).checked = true;

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
