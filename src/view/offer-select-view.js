import ComponentView, {html} from './component-view.js';
import OfferToggleView from './offer-toggle-view.js';

/** @typedef {[title: string, price: string, isChecked: boolean][]} OfferSelectState  */

export default class OfferSelectView extends ComponentView {
  constructor(...state) {
    super(...state);

    this.classList.add('event__section', 'event__section--offers');
    this.style.display = 'block';

    this.addEventListener('click', this.onClick);
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

  setVisibility(flag = true) {
    this.style.display = flag ? 'none' : 'block';

    return this;
  }


  /**
   * @param {Event & {target: HTMLInputElement}} event
   */
  onClick(event) {
    //if (event.target.type === 'checkbox') {
    //  const ggg = Boolean(event.target.checked);
    //  event.target.checked = ggg;
    //}
  }
}

customElements.define(String(OfferSelectView), OfferSelectView);
