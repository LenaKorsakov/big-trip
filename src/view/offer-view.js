import ComponentView, {html} from './component-view.js';

/**
 * View выбранных предложений для точки маршрута
 */
export default class OfferView extends ComponentView {
  constructor() {
    super();

    this.classList.add('event__offer');
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
      <span class="event__offer-title">Order Uber</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">20</span>
  `;

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
