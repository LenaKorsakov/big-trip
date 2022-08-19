import BaseView from './base-view';
import createAdjacentHtml from './sort-template';

/**
 * View сортировки
 */
export default class SortView extends BaseView {
  /**
   * @override
   */
  createAdjacentHtml() {
    return createAdjacentHtml();
  }
}

customElements.define('trip-sort', SortView);
