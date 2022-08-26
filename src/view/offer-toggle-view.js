import ComponentView, {html} from './component-view.js';

/**
 * View предложений для точки маршрута в форме редактирования/создания
 */
export default class OfferToggleView extends ComponentView {
  /**
   * @override
   */
  createAdjacentHtml(title, price) {
    return html`
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden"
        id="event-offer-comfort-1"
        type="checkbox"
        name="event-offer-comfort">
      <label class="event__offer-label" for="event-offer-comfort-1">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>
  `;
  }

  /**
   * Установит атрибут checked
   * @param {boolean} checked
   */
  setChecked(checked) {
    this.querySelector('.event__offer-checkbox').checked = checked;

    return this;
  }
}

customElements.define(String(OfferToggleView), OfferToggleView);
