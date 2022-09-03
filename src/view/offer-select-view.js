import ComponentView, {html} from './component-view.js';
import OfferToggleView from './offer-toggle-view.js';
/** @typedef {[title: string, price: string, isChecked: boolean][]} OfferSelectState  */

export default class OfferSelectView extends ComponentView {
  constructor(...state) {
    super(...state);

    this.classList.add('event__section', 'event__section--offers');
    this.style.display = 'block';
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
    const views = states.map(([title, price, isChecked]) => new OfferToggleView(title, price).setChecked(isChecked));

    this.querySelector('.event__available-offers').replaceChildren(...views);

    return this;
  }

  setVisibility(flag = true) {
    this.style.display = flag ? 'none' : 'block';

    return this;
  }

}

customElements.define(String(OfferSelectView), OfferSelectView);
