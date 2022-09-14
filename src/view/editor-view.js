import ListItemView, {html} from './list-item-view';
import TypeSelectView from './type-select-view';
import DestinationSelectView from './destination-select-view';
import DatePickerView from './date-picker-view';
import PriceInputView from './price-input-view';
import OfferSelectView from './offer-select-view';
import DestinationDetailsView from './destination-details-view';

/**
 * @implements EventListenerObject
 */
export default class EditorView extends ListItemView {
  #linkedView = null;

  constructor() {
    super();

    /** @type {TypeSelectView} */
    this.typeSelectView = this.querySelector(String(TypeSelectView));

    /** @type {DatePickerView} */
    this.dataPickerView = this.querySelector(String(DatePickerView));

    /** @type {PriceInputView} */
    this.priceInputView = this.querySelector(String(PriceInputView));

    /** @type {OfferSelectView} */
    this.offerSelectView = this.querySelector(String(OfferSelectView));

    /** @type {DestinationDetailsView} */
    this.destinationDetailsView = this.querySelector(String(DestinationDetailsView));

    /** @type {DestinationSelectView} */
    this.destinationSelectView = this.querySelector(String(DestinationSelectView));

    this.addEventListener('submit', this.#onViewSubmit);
    this.addEventListener('reset', this.#onViewReset);
    this.addEventListener('click', this.#onViewClick);
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${TypeSelectView}
          ${DestinationSelectView}
          </div>
          ${DatePickerView}
          ${PriceInputView}
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${OfferSelectView}
          ${DestinationDetailsView}
        </section>
      </form>
    `;
  }

  /**
   * @param {boolean} flag
   * @param {string} value
   */
  toggleDisabledButton(type, flag, value) {
    const submitButton = this.querySelector(`[type="${type}"]`);

    submitButton.disabled = flag;
    submitButton.textContent = value;
  }

  /**
   * @param {HTMLElement} view
   */
  link(view) {
    this.#linkedView = view;

    return this;
  }

  open() {
    this.#linkedView.replaceWith(this);

    document.addEventListener('keydown', this);

    return this;
  }

  /**
   * @param {boolean} [silent]
   */
  close(silent) {
    this.replaceWith(this.#linkedView);

    document.removeEventListener('keydown', this);

    if (!silent) {
      this.dispatchEvent(new CustomEvent('close'));
    }

    return this;
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    if (event.key?.startsWith('Esc')) {
      this.close();
    }
  }

  #onViewSubmit(event) {
    event.preventDefault();
  }

  #onViewReset(event) {
    event.preventDefault();
  }

  #onViewClick(event) {
    if (event.target.closest('.event__rollup-btn')) {
      this.close();
    }
  }
}

customElements.define(String(EditorView), EditorView);
