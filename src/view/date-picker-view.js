import ComponentView, {html} from './component-view.js';
import { formatStringToFullFDate } from '../format.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

/**
 * View для ввода даты с использованием библиотеки flatpickr.js
 */
export default class DatePickerView extends ComponentView {
  #datepicker = null;
  constructor() {
    super(...arguments);

    this.defaultTime = formatStringToFullFDate(Date.now());

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

  removeElement = () => {
    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  #onStartDateChange = ([userDate]) => {
    this.setStartTime(formatStringToFullFDate(userDate));
  };

  #onEndDateChange = ([userDate]) => {
    this.setEndTime(formatStringToFullFDate(userDate));
  };

  // TODO flatpickr есть смысл инициализировать только в случае,
  // если поле выбора даты доступно для заполнения
  setStartTimepicker = () => {
    this.#datepicker = flatpickr(
      this.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y h:m',
        //defaultDate: this.defaultTime,
        onChange: this.#onStartDateChange, // На событие flatpickr передаём наш колбэк
      },
    );

    return this;
  };

  setEndTimepicker = () => {
    this.#datepicker = flatpickr(
      this.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y h:m',
        //defaultDate: this.defaultTime,
        onChange: this.#onEndDateChange
      },
    );

    return this;
  };
}

customElements.define(String(DatePickerView), DatePickerView);
