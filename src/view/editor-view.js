import ListItemView, {html} from './list-item-view';
import TypeSelectView from './type-select-view';
import DatePickerView from './date-picker-view';
import PriceInputView from './price-input-view';
import OfferSelectView from './offer-select-view';
import DestinationDetailsView from './destination-details-view';
import DestinationSelectView from './destination-select-view';

/**
 * View редактора точки маршрута
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

    this.querySelector('.event__reset-btn').addEventListener('click', this.onDeleteClick.bind(this));

    this.querySelector('.event__rollup-btn').addEventListener('click', this.onRollupClick.bind(this));

    this.addEventListener('submit', this.onFormSubmit);
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

  close() {
    this.replaceWith(this.#linkedView);

    document.removeEventListener('keydown', this);

    return this;
  }

  /**
   * Метод объекта (в данном случае this), реализующего EventListener, служит как колбэк-функция, использование позволяет запомнить нужный контекст
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }

  onDeleteClick() {
    this.close();
    this.dispatchEvent(
      new CustomEvent('delete'), {
      });
  }

  onRollupClick() {
    this.close();
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.close();
  }
}

customElements.define(String(EditorView), EditorView);
