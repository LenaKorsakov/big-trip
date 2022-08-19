import BaseView from './base-view';
import createAdjacentHtml from './point-template';

/**
 * View точки маршрута
 */
export default class PointView extends BaseView {
  constructor() {
    super();

    this.querySelector('.event__rollup-btn').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('expand'));
    });
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return createAdjacentHtml();
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
   Заменит предложения на выбранные
   * @param  {...any} views
   */
  replaceOffers(...views) {
    this.querySelector('.event__selected-offers').replaceChildren(...views);

    return this;
  }
}

customElements.define('trip-point', PointView);
