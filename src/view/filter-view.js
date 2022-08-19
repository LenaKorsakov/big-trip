import BaseView from './base-view';
import createAdjacentHtml from './filter-template';

/**
 * View фильтра
 */
export default class FilterView extends BaseView {
  /**
   * @override
   */
  createAdjacentHtml() {
    return createAdjacentHtml();
  }
}

/**
 * Теперь для любых HTML-элементов с тегом <trip-filter> создаётся экземпляр FilterView и вызываются его методы
 */
customElements.define('trip-filter', FilterView);
