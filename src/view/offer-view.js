import BaseView from './base-view';
import createAdjacentHtml from './offer-template';

/**
 * View выбранных предложений для точки маршрута
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
     */
  setPrice(price) {
    this.querySelector('.event__offer-price').textContent = price;

    return this;
  }

  /**
   * Установит название предложения
   * @param {string}
   */
  setTitle(title) {
    this.querySelector('.event__offer-title').textContent = title;

    return this;
  }
}

customElements.define('trip-offer', OfferView);
