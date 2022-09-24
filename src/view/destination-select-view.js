import View, {html} from './view.js';
import './destination-select-view.css';

export default class DestinationSelectView extends View {
  constructor() {
    super();

    this.classList.add('event__field-group', 'event__field-group--destination');

    this.addEventListener('focus', this.#onFocus, true);
    this.addEventListener('change', this.#onChange);
    this.addEventListener('keydown', this.#onKeyDown);
    this.addEventListener('blur', this.#onBlur, true);

    this.inputView = this.querySelector('input');
    this.labelView = this.querySelector('label');
    this.optionListView = this.querySelector('datalist');
  }

  get allowedKeys() {
    return ['Tab', 'ArrowUp', 'ArrowDown'];
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
      <label class="event__label  event__type-output" for="event-destination-1"></label>
      <input
        class="event__input  event__input--destination"
        id="event-destination-1"
        type="text"
        name="event-destination"
        list="destination-list-1"
        autocomplete="off"
      >
      <datalist id="destination-list-1"></datalist>
    `;
  }

  /**
   * @param {DestinationOptionState} state
   */
  createOptionHtml(...state) {
    const [label, value] = state;

    return html`<option value="${value}"> ${label} </option>`;
  }

  /**
   * @param {DestinationOptionState[]} states
   */
  setOptions(states) {
    this.optionListView.innerHTML = html`${
      states.map((state) => this.createOptionHtml(...state))
    }`;

    return this;
  }

  /**
   * @param {string} label
   */
  setLabel(label) {
    this.labelView.textContent = label;
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

  #onFocus() {
    this.#moveValueToPlaceholder();
  }

  #onChange() {
    this.#moveValueToPlaceholder();
  }

  /**
   * @param {KeyboardEvent} event
   */
  #onKeyDown(event) {
    if(!this.allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  #onBlur() {
    this.#movePlaceholderToValue();
  }

}

customElements.define(String(DestinationSelectView), DestinationSelectView);
