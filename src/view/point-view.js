import ListItemView, {html} from './list-item-view.js';
import OfferView from './offer-view.js';

/**
 * @typedef PointState
 * @prop {number} id
 * @prop {string} isoStartDate
 * @prop {string} isoEndDate
 * @prop {string} startDate
 * @prop {string} title
 * @prop {string} icon
 * @prop {string} startTime
 * @prop {string} endTime
 * @prop {string} price
 * @prop {OfferState[]} offers
 */
export default class PointView extends ListItemView {
  #id;

  /**
   * @param {PointState} state
   */
  constructor(state) {
    super(state);

    this.#id = state.id;
    this.setOffers(state.offers);

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
   * @type {PointState} state
   * @override
   */
  createAdjacentHtml(state) {

    return html`
      <div class="event">
        <time class="event__date" datetime="${state.isoStartDate}">${state.startDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${state.icon}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${state.title}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${state.isoStartDate}">${state.startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${state.isoEndDate}">${state.endTime}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${state.price}</span>
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
