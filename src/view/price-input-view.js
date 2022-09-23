import View, {html} from './view.js';

export default class PriceInputView extends View {
  constructor() {
    super();

    /** @type {HTMLInputElement} */
    this.inputView = this.querySelector('.event__input--price');

    this.classList.add('event__field-group', 'event__field-group--price');
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input
        class="event__input  event__input--price"
        type="number"
        min="1"
        max="1000000"
        id="event-price"
        name="event-price"
        autocomplete="off"
        required
      >
    `;
  }

  /**
   * @param {string} price
   */
  setPrice(price) {
    this.inputView.value = price;

    return this;
  }

  getPrice() {
    return this.inputView.value;
  }
}

customElements.define(String(PriceInputView), PriceInputView);
