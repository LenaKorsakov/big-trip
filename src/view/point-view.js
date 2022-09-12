import ListItemView, {html} from './list-item-view.js';


export default class PointView extends ListItemView {
  #id;

  /**
   * @param {PointState} state
   */
  constructor(state) {
    super(state);

    this.#id = state.id;
    this.id = `item-${state.id}`;

    this.addEventListener('click', this.onClick);
  }

  onClick(event) {
    if (!event.target.closest('.event__rollup-btn')) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent('point-edit', {
        detail: this.#id,
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
      <div class ="event">
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
          ${state.offers.map(([title, price]) => html`
          <div class = "event__offer">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
         </div>
        `)}
        </div>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
  `;
  }
}

customElements.define(String(PointView), PointView);
