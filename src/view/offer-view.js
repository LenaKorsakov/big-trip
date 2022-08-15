import BaseView from './base-view';
import createAdjacentHtml from './offer-template';

/**
 * Trip offer
 */
export default class OfferView extends BaseView {
  constructor() {
    super();

    this.classList.add('event__offer');
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return createAdjacentHtml();
  }

}

customElements.define('trip-offer', OfferView);
