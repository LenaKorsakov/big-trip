import BaseView from './base-view';
import createAdjacentHtml from './no-points-template';

/**
 * View сообщения с приглашением добавить первую точку маршрута
 */
export default class NoPointsView extends BaseView {
  /**
   * @override
   */
  createAdjacentHtml() {
    return createAdjacentHtml();
  }

  /**
   * @param {string} message
   */
  setMessage(message) {
    this.querySelector('p').textContent = message;

    return this;
  }
}

customElements.define('trip-no-points', NoPointsView);
