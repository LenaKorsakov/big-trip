import ComponentView, {html} from './component-view.js';

/**
 * View выбранных предложений для точки маршрута
 */
export default class OfferView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('event__offer');
  }

  /**
   * @override
   */
  createAdjacentHtml(title, price) {
    return html`
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
  `;
  }
}

customElements.define(String(OfferView), OfferView);
