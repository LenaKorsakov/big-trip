import ComponentView, {html} from './component-view.js';
/** @typedef {[title: string, price: string]} OfferState  */

export default class OfferView extends ComponentView {
/**
 * @param  {OfferState} state
 */
  constructor(...state) {
    super(...state);

    this.classList.add('event__offer');
  }

  /**
   * @param {OfferState} state
   * @override
   */
  createAdjacentHtml(...state) {
    const [title, price] = state;
    return html`
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
  `;
  }
}

customElements.define(String(OfferView), OfferView);
