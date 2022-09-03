import ComponentView, {html} from './component-view.js';
import OfferView from './offer-view.js';

/**
 * View точки маршрута
 */
export default class PointView extends ComponentView {
  #id;

  /**
   * @param {number} id
   */
  constructor(id) {
    super();

    this.#id = id;
    this.addEventListener('click', this.onClick);
  }

  onClick(event) {
    if (!event.target.closest('.event__rollup-btn')) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent('point-edit', {
        detail:this.#id,
        bubbles: true
      })
    );
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
      <div class="event">
        <time class="event__date" datetime="2019-03-18">MAR 18</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
        </div>
        <h3 class="event__title">Taxi Amsterdam</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">20</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <div class="event__selected-offers">
        <!--offers-->
        </div>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
  `;
  }

  /**
   * Установит дату события
   * @param {string}
   */
  setDate(date) {
    this.querySelector('.event__date').textContent = date;

    return this;
  }

  /**
   * Установит название события
   * @param {string}
   */
  setTitle(title) {
    this.querySelector('.event__title').textContent = title;

    return this;
  }

  /**
   * Установит иконку события
   * @param {string}
   */
  setIcon(type){
    this.querySelector('.event__type-icon').src = `img/icons/${type}.png`;

    return this;
  }

  /**
   * Установит время начала события
   * @param {string}
   */
  setTimeFrom(time) {
    this.querySelector('.event__start-time').textContent = time;

    return this;
  }

  /**
     * Установит время окончания события
     * @param {string}
     */
  setTimeTo(time) {
    this.querySelector('.event__end-time').textContent = time;

    return this;
  }

  /**
     * Установит цену события
     * @param {number}
     */
  setPrice(price) {
    this.querySelector('.event__price-value').textContent = price;

    return this;
  }

  /**
     * @param  {OfferState[]} states
     */
  setOffers(states) {
    const views = states.map((state) => new OfferView(...state));
    this.querySelector('.event__selected-offers').replaceChildren(...views);

    return this;
  }
}

customElements.define(String(PointView), PointView);
