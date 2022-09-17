import View, {html} from './view.js';
import './destination-select-view.css';

export default class DestinationSelectView extends View {
  constructor(states) {
    super(states);

    this.classList.add('event__field-group', 'event__field-group--destination');

    this.addEventListener('focus', this.#onViewFocus, true);
    this.addEventListener('change', this.#onViewChange);
    this.addEventListener('keydown', this.#onViewKeyDown);
    this.addEventListener('blur', this.#onViewBlur, true);

    this.inputView = this.querySelector('input');
  }

  get allowedKeys() {
    return ['Tab', 'ArrowUp', 'ArrowDown'];
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
      <label class="event__label  event__type-output" for="event-destination-1">

      </label>
      <input class="event__input  event__input--destination"
        id="event-destination-1"
        type="text"
        name="event-destination"
        value=""
        list="destination-list-1"
        autocomplete="off">
        <datalist id="destination-list-1">
        </datalist>
    `;
  }

  /**
   * @param {DestinationOptionState} states
   */
  setOptions(states) {
    this.querySelector('datalist').innerHTML = html`${
      states.map((state) => this.#createOptionHtml(state))
    }`;

    return this;
  }

  setLabel(label) {
    this.querySelector('.event__label').textContent = label;
  }


  /**
   * @param {string} value
   */
  setValue(value) {
    this.inputView.value = value;

    return this;
  }

  getValue() {
    return this.inputView.value || this.inputView.placeholder;
  }

  #createOptionHtml(state) {
    return html`<option> ${state} </option>`;
  }

  #moveValueToPlaceholder() {
    const {inputView} = this;

    inputView.placeholder = inputView.value;
    inputView.value = '';
  }

  #movePlaceholderToValue() {
    const {inputView} = this;

    inputView.value = inputView.placeholder;
    inputView.placeholder = '';
  }

  #onViewFocus() {
    this.#moveValueToPlaceholder();
  }

  #onViewChange() {
    this.#moveValueToPlaceholder();
  }

  #onViewKeyDown(event) {
    if(!this.allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  #onViewBlur() {
    this.#movePlaceholderToValue();
  }

}

customElements.define(String(DestinationSelectView), DestinationSelectView);
