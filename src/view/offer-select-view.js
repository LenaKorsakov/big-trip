import ComponentView, {html} from './component-view.js';
import OfferToggleView from './offer-toggle-view.js';

export default class OfferSelectView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('event__section', 'event__section--offers');
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
      <section class="event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">
        Offers
        </h3>

        <div class="event__available-offers">
        </div>

      </section>
    `;
  }

  /**
     * Заменит предложения на предложения выбранного типа
     * @param  {Offer[]} offers
     */
  replaceOffers(offers) {
    const views = offers.map((offer) => new OfferToggleView(offer.title, offer.price));
    this.querySelector('.event__available-offers').replaceChildren(...views);

    return this;
  }

  hide() {
    this.style.display = 'none';

    return this;
  }

}

customElements.define(String(OfferSelectView), OfferSelectView);
