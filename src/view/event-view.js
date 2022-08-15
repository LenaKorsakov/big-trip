import BaseView from './base-view';
import createAdjacentHtml from './event-template';

/**
 * Trip event
 */
export default class EventView extends BaseView {
  /**
   * @override
   */
  createAdjacentHtml() {
    return createAdjacentHtml();
  }

  addOffer(...views) {
    this.querySelector('.event__selected-offers').append(...views);

    return this;
  }
}

customElements.define('trip-event', EventView);
