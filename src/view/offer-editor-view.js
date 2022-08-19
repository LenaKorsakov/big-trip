import BaseView from './base-view';
import createAdjacentHtml from './offer-editor-template';

/**
 * View предложений для точки маршрута в форме редактирования/создания
 */
export default class OfferEditorView extends BaseView {
  /**
   * @override
   */
  createAdjacentHtml() {
    return createAdjacentHtml();
  }

  /**
     * Установит цену предложения
     * @param {number}
     */
  setOfferPrice(price) {
    this.querySelector('.event__offer-price').textContent = price;

    return this;
  }

  /**
   * Установит атрибут checked
   * @param {boolean} checked
   */
  setChecked(checked) {
    this.querySelector('.event__offer-checkbox').checked = checked;

    return this;
  }

  /**
   * Установит название предложения
   * @param {string}
   */
  setOfferTitle(title) {
    this.querySelector('.event__offer-title').textContent = title;

    return this;
  }
}

customElements.define('trip-editor-offer', OfferEditorView);
