import BaseView from './base-view';
import createAdjacentHtml from './point-editor-template';

/**
 * View редактора точки маршрута
 */
export default class PointEditorView extends BaseView {
  #linkedView = null;

  constructor() {
    super();

    this.querySelector('.event__reset-btn').addEventListener('click', () => {
      this.close();
    });

    this.querySelector('.event__rollup-btn').addEventListener('click', () => {
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
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    if (event.key === 'Escape') {
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
   * Установит тип события
   * @param {string}
   */
  setType(type) {
    this.querySelector('.event__label').textContent = type;

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
   * Установит иконку события
   * @param {string}
   */
  setIcon(type){
    this.querySelector('.event__type-icon').src = `img/icons/${type}.png`;

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
