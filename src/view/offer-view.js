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

  /**
     * Установит цену предложения
     * @param {number}
     * @returns
     */
  setOfferPrice(price) {
    this.querySelector('.event__offer-price').textContent = price;

    return this;
  }

  /**
   * Установит название предложения
   * @param {string}
   * @returns
   */
  setOfferTitle(title) {
    this.querySelector('.event__offer-title').textContent = title;

    return this;
  }
}

customElements.define('trip-offer', OfferView);
