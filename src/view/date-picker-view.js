import View, {html} from './view.js';
import initCalendar from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

export default class DatePickerView extends View {
  #startDateCalendar;
  #endDateCalendar;

  constructor() {
    super(...arguments);

    this.classList.add('event__field-group', 'event__field-group--destination');

    this.#startDateCalendar = initCalendar(this.querySelector('#event-start-time-1'));
    this.#endDateCalendar = initCalendar(this.querySelector('#event-end-time-1'));
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time">
    `;
  }

  /**
   * @param {CalendarOptions} startDateOptions
   * @param {CalendarOptions} endDateOptions
   */
  configure(startDateOptions, endDateOptions = startDateOptions) {
    this.#startDateCalendar.set(startDateOptions);
    this.#endDateCalendar.set(endDateOptions);

    return this;
  }

  /**
   * @param {CalendarDate} startDate
   * @param {CalendarDate} endDate
   */
  setDates(startDate, endDate = startDate) {
    this.#startDateCalendar.setDate(startDate, true);
    this.#endDateCalendar.setDate(endDate, true);
  }

  getDates() {
    return [
      this.#startDateCalendar.selectedDates[0]?.toJSON(),
      this.#endDateCalendar.selectedDates[0]?.toJSON()
    ];
  }

  /**
   * @param {CalendarOptions} options
   */
  static setDefaults(options) {
    initCalendar.setDefaults(options);
  }
}

customElements.define(String(DatePickerView), DatePickerView);
