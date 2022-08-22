import ComponentView, {html} from './component-view';
import TypeSelectView from './type-select-view';

/**
 * View редактора точки маршрута
 */
export default class EditorView extends ComponentView {
  #linkedView = null;

  constructor() {
    super();

    /** @type {TypeSelectView} */
    this.typeSelectView = this.querySelector(String(TypeSelectView));
    //остальные компоненты

    //TODO каждый раз искать элемент - неэффективно, создать метод поиска элемента по передаваемому селектору?
    this.querySelector('.event__reset-btn').addEventListener('click', () => {
      this.close();
    });

    this.querySelector('.event__rollup-btn').addEventListener('click', () => {
      this.close();
    });

    this.querySelector('.event__save-btn').addEventListener('submit', (event) => {
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
        <!--DestinationInputView-->
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            Flight
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
          <datalist id="destination-list-1">
          <!--здесь будет метод сет чето и конструкутор нью option-->
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>
          <!--DatePickerView-->
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
        </div>
          <!--PriceInputView-->
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="100">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
      <!--OfferSelectView-->
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
              <label class="event__offer-label" for="event-offer-luggage-1">
                <span class="event__offer-title">Add luggage</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">30</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
              <label class="event__offer-label" for="event-offer-comfort-1">
                <span class="event__offer-title">Switch to comfort class</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">100</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
              <label class="event__offer-label" for="event-offer-meal-1">
                <span class="event__offer-title">Add meal</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">15</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
              <label class="event__offer-label" for="event-offer-seats-1">
                <span class="event__offer-title">Choose seats</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">5</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
              <label class="event__offer-label" for="event-offer-train-1">
                <span class="event__offer-title">Travel by train</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">40</span>
              </label>
            </div>
          </div>
        </section>
          <!--DestinationDetalesView-->
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
             <!--здесь будет метод сет пикчерс и конструкутор нью имедж-->
              <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
              <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
              <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
              <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
              <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
            </div>
          </div>
        </section>
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

  hideOffersBlock() {
    this.querySelector('.event__section--offers').style.display = 'none';

    return this;
  }

  hideDestinationBlock() {
    this.querySelector('.event__section--destination').style.display = 'none';

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
