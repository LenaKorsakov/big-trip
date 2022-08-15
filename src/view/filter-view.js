import BaseView from './base-view';
import createAdjacentHtml from './filter-template';

/**
 * Trip filter
 */
export default class FilterView extends BaseView {
  /**
   * @override
   */
  createAdjacentHtml() {
    return createAdjacentHtml();
  }
}

customElements.define('trip-filter', FilterView);
