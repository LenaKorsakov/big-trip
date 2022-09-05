import ComponentView, {html} from './component-view.js';
import TypeOptionView from './type-option-view.js';

/**
 * View иконки с выбором типа пункта путешествия
 */
export default class TypeSelectView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('event__type-wrapper');
    this.addEventListener('change', this.onChange);
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
        </fieldset>
      </div>
    `;
  }

  /**
   * Параметр - список из подсписков комбинаций вида ['Bus', 'bus'], ...
   * @param {[string, PointType][]} states
   */
  setOptions(states) {
    const views = states.map((state) => new TypeOptionView(...state));

    this.querySelector('legend').after(...views);

    return this;
  }

  getValue() {
    return this.querySelector('[type=radio]:checked').value;
  }

  /**
   * @param {string} value
   */
  setValue(value) {
    this.querySelector('img').src = `img/icons/${value}.png`;
    this.querySelector(`[value="${value}"]`).checked = true;

    return this.expand(false);
  }

  expand(flag = true) {
    this.querySelector('input').checked = flag;

    return this;
  }

  /**
   * @param {Event & {target: HTMLInputElement}} event
   */
  onChange(event) {
    const {type, value} = event.target;

    if (type === 'checkbox') {
      event.stopPropagation();
      return;
    }

    if (type === 'radio') {
      this.setValue(value);
    }
  }
}

customElements.define(String(TypeSelectView), TypeSelectView);
