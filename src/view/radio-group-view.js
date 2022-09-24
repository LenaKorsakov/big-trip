import View from './view.js';

export * from './view.js';

export default class RadioGroupView extends View {
  get optionSelector() {
    return '[type=radio]';
  }

  getValue() {
    /** @type {HTMLInputElement} */
    const view = this.querySelector(`${this.optionSelector}:checked`);

    if (view) {
      return view.value;
    }

    return '';
  }

  /**
   * @param {string} value
   */
  setValue(value) {
    /** @type {HTMLInputElement} */
    const view = this.querySelector(`${this.optionSelector}[value="${value}"]`);

    if (view) {
      view.checked = true;
    }

    return this;
  }

  /**
   * @param {boolean[]} flags
   */
  setOptionsDisabled(flags) {
    /** @type {NodeListOf<HTMLInputElement>} */
    const views = this.querySelectorAll(this.optionSelector);

    views.forEach((view, index) => {
      view.disabled = flags[index];
    });

    return this;
  }
}
