import ComponentView, {html} from './component-view.js';
/** @typedef {[title: string, price: string]} OfferToggleState  */

export default class OfferToggleView extends ComponentView {
  /**
   * @param {OfferToggleState} state
   */
  constructor(...state) {
    super(...state);
  }

  /**
   * @override
   * @param {OfferToggleState} state
   */
  createAdjacentHtml(...state) {
    const [title, price, id, checked] = state;
    return html`
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden"
        id="event-offer-comfort-${id}"
        type="checkbox"
        name="event-offer-comfort"
        value="${id}";
        ${checked ? 'checked' : ''}
      >
      <label class="event__offer-label" for="event-offer-comfort-${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>
  `;
  }

  /**
   * @param {boolean} flag
   */
  setChecked(flag) {
    this.querySelector('.event__offer-checkbox').checked = flag;

    return this;
  }
}

customElements.define(String(OfferToggleView), OfferToggleView);
