import ComponentView, {html} from './component-view.js';
import OfferToggleView from './offer-toggle-view.js';
import './offer-select-view.css';

export default class OfferSelectView extends ComponentView {
  constructor(...state) {
    super(...state);

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
      <!--offerToggleViews-->
      </div>
    `;
  }

  /**
     * @param  {OfferSelectState} states
     */
  setOffers(states) {
    const views = states.map(([title, price, id, isChecked]) => new OfferToggleView(title, price, id).setChecked(isChecked));

    this.querySelector('.event__available-offers').replaceChildren(...views);

    return this;
  }

  getSelectedValues() {
    const views = this.querySelectorAll(':checked');

    return [...views].map((view) => view.value);
  }
}

customElements.define(String(OfferSelectView), OfferSelectView);
