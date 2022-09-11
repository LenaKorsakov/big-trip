import ComponentView, {html} from './component-view.js';
import './destination-select-view.css';
/** @typedef {[string, string][]} DestinationOptionState  */

export default class DestinationSelectView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('event__field-group', 'event__field-group--destination');

    this.addEventListener('focus', this.onFocus, true);
    this.addEventListener('change', this.onChange);
    this.addEventListener('keydown', this.onKeyDown);
    this.addEventListener('blur', this.onBlur, true);

    this.inputView = this.querySelector('input');
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
        list="destination-list-1">

        <datalist id="destination-list-1">
        <!--options-->
        </datalist>
    `;
  }

  get allowedKeys() {
    return ['Tab', 'ArrowUp', 'ArrowDown'];
  }

  setLabel(label) {
    this.querySelector('.event__label').textContent = label;
  }

  /**
   * @param {DestinationOptionState} states
   */
  setOptions(states) {
    const views = states.map((state) => new Option(...state));
    this.querySelector('datalist').replaceChildren(...views);

    return this;
  }

  /**
   * @param {string} destination
   */
  setValue(destination) {
    this.inputView.value = destination;

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

  onFocus() {
    this.#moveValueToPlaceholder();
  }

  onChange() {
    this.#moveValueToPlaceholder();
  }

  onKeyDown(event) {
    if(!this.allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  onBlur() {
    this.#movePlaceholderToValue();
  }

}

customElements.define(String(DestinationSelectView), DestinationSelectView);
