import ComponentView, {html} from './component-view';
import TypeSelectView from './type-select-view';
import DataPickerView from './data-picker-view';
import PriceInputView from './price-input-view';
import OfferSelectView from './offer-select-view';
import DestinationDetailesView from './destination-detailes-view';
import DestinationInputView from './destination-input-view';

/**
 * View редактора точки маршрута
 */
export default class EditorView extends ComponentView {
  #linkedView = null;

  constructor() {
    super();

    /** @type {TypeSelectView} */
    this.typeSelectView = this.querySelector(String(TypeSelectView));
    /** @type {DataPickerView} */
    this.dataPickerView = this.querySelector(String(DataPickerView));
    /** @type {PriceInputView} */
    this.priceInputView = this.querySelector(String(PriceInputView));
    /** @type {PriceInputView} */
    this.offerSelectView = this.querySelector(String(OfferSelectView));
    /** @type {DestinationDetailesView} */
    this.destinationDetailesView = this.querySelector(String(DestinationDetailesView));
    /** @type {DestinationInputView} */
    this.destinationInputView = this.querySelector(String(DestinationInputView));

    //TODO каждый раз искать элемент - неэффективно, создать метод поиска элемента по передаваемому селектору?
    this.querySelector('.event__reset-btn').addEventListener('click', () => {
      this.close();
    });

    this.querySelector('.event__rollup-btn').addEventListener('click', () => {
      this.close();
    });

    this.addEventListener('submit', (event) => {
      event.preventDefault();
      this.close();
    });
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
      <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        ${TypeSelectView}
        ${DestinationInputView}
        </div>
        ${DataPickerView}
        ${PriceInputView}
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${OfferSelectView}
        ${DestinationDetailesView}
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

  close() {
    this.replaceWith(this.#linkedView);

    document.removeEventListener('keydown', this);

    return this;
  }

  /**
   * Установит направление
   * @param {string}
   */
  setDestination(destination) {
    this.querySelector('#event-destination-1').value = destination;

    return this;
  }

  /**
   * Установит тип события и его иконку
   * @param {string}
   */
  setLable(type) {
    this.querySelector('.event__label').textContent = type;
    this.querySelector('.event__type-icon').src = `img/icons/${type}.png`;

    return this;
  }

  /**
   * Установит время начала события
   * @param {string}
   */
  setStartTime(date) {
    this.querySelector('#event-start-time-1').value = date;

    return this;
  }

  /**
   * Установит время окончания события
   * @param {string}
   */
  setEndTime(date) {
    this.querySelector('#event-end-time-1').value = date;

    return this;
  }

  /**
     * Установит цену события
     * @param {number}
     */
  setPrice(price) {
    this.querySelector('.event__input--price').value = price;

    return this;
  }

  /**
     * Установит описание направления
     * @param {number}
     */
  setDestinationDescription(description) {
    this.querySelector('.event__destination-description').textContent = description;

    return this;
  }

  /**
     * Заменит предложения на выбранные
     * @param  {...any} views
     */
  replaceOffers(...views) {
    this.querySelector('.event__available-offers').replaceChildren(...views);

    return this;
  }

  /**
   * Заменит фотографии по умолчанию на фотографии выбранного направления
   * @param  {...any} views
   */
  replacePictures(...views) {
    this.querySelector('.event__photos-tape').replaceChildren(...views);

    return this;
  }
}

customElements.define(String(EditorView), EditorView);
