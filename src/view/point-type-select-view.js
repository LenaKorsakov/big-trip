import RadioGroupView, {html} from './radio-group-view';

export default class PointTypeSelectView extends RadioGroupView {
  constructor() {
    super();

    this.classList.add('event__type-wrapper');

    /** @type {HTMLInputElement} */
    this.toggleView = this.querySelector('.event__type-toggle');

    this.addEventListener('focus', this.#onFocus, true);
    this.addEventListener('blur', this.#onBlur, true);
    this.addEventListener('pointerdown', this.#onPointerDown);
    this.addEventListener('click', this.#onClick);
    this.addEventListener('change', this.#onViewChange);
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
      <label class="event__type  event__type-btn" for="event-type-toggle-1" tabindex="0">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" tabindex="-1">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
        </fieldset>
      </div>
    `;
  }

  /**
   * @param {PointTypeOptionState} state
   */
  createOptionHtml(...state) {
    const [label, value] = state;

    return html`
    <div class="event__type-item">
      <input
          id="event-type-${value}-1"
          class="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value="${value}"
        >
        <label class="event__type-label  event__type-label--${value}" for="event-type-${value}-1">
          ${label}
        </label>
    </div>
    `;
  }

  /**
   * @param {PointTypeOptionState[]} states
   */
  setOptions(states) {
    this.querySelector('legend').insertAdjacentHTML('afterend', html`${
      states.map((state) => this.createOptionHtml(...state))
    }`);

    return this;
  }

  /**
   * @override
   * @param {string} value
   */
  setValue(value) {
    super.setValue(value);

    this.querySelector('img').src = `img/icons/${value}.png`;

    return this;
  }

  /**
   * @param {FocusEvent} event
   */
  #onFocus(event) {
    if (event.target === this.toggleView.labels[0]) {
      this.toggleView.checked = true;
    }
  }

  /**
   * @param {FocusEvent & {relatedTarget: Element}} event
   */
  #onBlur(event) {
    if (!this.contains(event.relatedTarget)) {
      this.toggleView.checked = false;
    }
  }

  /**
   * @param {PointerEvent} event
   */
  #onPointerDown(event) {
    event.preventDefault();
  }

  /**
   * @param {MouseEvent & {target: HTMLInputElement}} event
   */
  #onClick(event) {
    if (event.target.type === 'radio') {
      this.toggleView.checked = false;
    }
  }

  /**
   * @param {Event & {target: HTMLInputElement}} event
   */
  #onViewChange(event) {
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

customElements.define(String(PointTypeSelectView), PointTypeSelectView);

