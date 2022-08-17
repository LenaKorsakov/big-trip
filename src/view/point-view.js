import BaseView from './base-view';
import createAdjacentHtml from './point-template';

/**
 * Trip event
 */
export default class PointView extends BaseView {
  /**
   * @override
   */
  createAdjacentHtml() {
    return createAdjacentHtml();
  }

  /**
   * Установит дату события
   * @param {string}
   * @returns
   */
  setDate(date) {
    this.querySelector('.event__date').textContent = date;

    return this;
  }

  /**
   * Установит название события
   * @param {string}
   * @returns
   */
  setTitle(title) {
    this.querySelector('.event__title').textContent = title;

    return this;
  }

  /**
   * Установит время начала события
   * @param {string}
   * @returns
   */
  setTimeFrom(time) {
    this.querySelector('.event__start-time').textContent = time;

    return this;
  }

  /**
     * Установит время окончания события
     * @param {string}
     * @returns
     */
  setTimeTo(time) {
    this.querySelector('.event__end-time').textContent = time;

    return this;
  }

  /**
     * Установит цену события
     * @param {number}
     * @returns
     */
  setPrice(price) {
    this.querySelector('.event__price-value').textContent = price;

    return this;
  }

  addOffer(...views) {
    this.querySelector('.event__selected-offers').append(...views);

    return this;
  }
}

customElements.define('trip-event', PointView);
