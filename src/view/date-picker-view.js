import ComponentView, {html} from './component-view.js';
import initCalendar from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

/** @typedef {import('flatpickr/dist/types/instance').Instance} Calendar */
/** @typedef {import('flatpickr/dist/types/options').DateOption} CalendarDate */
/** @typedef {import('flatpickr/dist/types/options').Options} CalendarOptions */

export default class DatePickerView extends ComponentView {
  #startDateCalendar;
  #endDateCalendar;

  constructor() {
    super(...arguments);

    this.classList.add('event__field-group', 'event__field-group--destination');

    const onStartDateChange = ([date]) => {
      this.#endDateCalendar.set('minDate', date);
    };

    const calendarDefaults = {
      'enableTime': true,
      'time_24hr': true
    };

    this.#startDateCalendar = initCalendar(this.querySelector('#event-start-time-1'), {
      ...calendarDefaults,
      onChange: [onStartDateChange]
    });
    this.#endDateCalendar = initCalendar(this.querySelector('#event-end-time-1'), calendarDefaults);
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
}

customElements.define(String(DatePickerView), DatePickerView);
