import View, {html} from './view.js';
import './offer-select-view.css';

export default class OfferSelectView extends View {
  constructor() {
    super();

    this.classList.add('event__section', 'event__section--offers');
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
      <h3 class="event__section-title  event__section-title--offers">
        Offers
      </h3>

      <div class="event__available-offers">
        <!--options-->
      </div>
    `;
  }

  /**
   * @param  {OfferOptionState} state
   */
  createOptionHtml(...state) {
    const [title, price, id, isChecked] = state;

    return html`
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden"
        id="event-offer-comfort-${id}"
        type="checkbox"
        name="event-offer-comfort"
        value="${id}";
        ${isChecked ? 'checked' : ''}
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
   * @param  {OfferOptionState[]} states
   */
  setOptions(states) {
    this.querySelector('.event__available-offers').innerHTML = html`${
      states.map((state) => this.createOptionHtml(...state))
    }`;

    return this;
  }

  getSelectedValues() {
    /** @type {NodeListOf<HTMLInputElement>} */
    const views = this.querySelectorAll(':checked');

    return [...views].map((view) => view.value);
  }
}

customElements.define(String(OfferSelectView), OfferSelectView);
