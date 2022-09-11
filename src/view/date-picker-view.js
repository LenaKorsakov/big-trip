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

    this.#startDateCalendar = initCalendar(this.querySelector('#event-start-time-1'), {
      enableTime: true,
      onChange: [(dates) =>
        this.#endDateCalendar.set('minDate', dates[0])
      ]
    });
    this.#endDateCalendar = initCalendar(this.querySelector('#event-end-time-1'), {
      enableTime: true,
      onChange: [(dates) =>
        this.#startDateCalendar.set('maxDate', dates[0])
      ]
    });
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
   * @param {CalendarDate} date
   * @param {CalendarOptions} options
   */
  setStartDate(date, options = {}) {
    this.#startDateCalendar.set(options);
    this.#startDateCalendar.setDate(date);

    return this;
  }

  /**
   * @param {CalendarDate} date
   * @param {CalendarOptions} options
   */
  setEndDate(date, options = {}) {
    this.#endDateCalendar.set(options);
    this.#endDateCalendar.setDate(date);

    return this;
  }
}

customElements.define(String(DatePickerView), DatePickerView);
