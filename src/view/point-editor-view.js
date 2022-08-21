import BaseView from './base-view';
import createAdjacentHtml from './point-editor-template';

/**
 * View редактора точки маршрута
 */
export default class PointEditorView extends BaseView {
  #linkedView = null;

  constructor() {
    super();

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
    return createAdjacentHtml();
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

customElements.define('trip-point-editor', PointEditorView);
