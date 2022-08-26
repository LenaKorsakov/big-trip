import ComponentView, {html} from './component-view.js';
/**
 * View для ввода даты с использованием библиотеки flatpickr.js
 */
export default class DatePickerView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('event__field-group', 'event__field-group--destination');
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
    `;
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
}

customElements.define(String(DatePickerView), DatePickerView);
