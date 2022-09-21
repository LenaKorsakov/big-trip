import View from './view.js';

export * from './view.js';

export default class RadioGroupView extends View {
  get itemSelector() {
    return '[type=radio]';
  }

  getValue() {
    /** @type {HTMLButtonElement} */
    const view = this.querySelector(`${this.itemSelector}:checked`);

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
    const view = this.querySelector(`${this.itemSelector}[value="${value}"]`);
    if (view) {
      view.checked = true;
    }

    return this;
  }

  /**
   * @param {boolean[]} flags
   */
  setOptionsDisabled(flags) {
    /** @type {HTMLInputElement[]} */
    const views = this.querySelectorAll(this.itemSelector);

    views.forEach((view, index) => {
      view.disabled = flags[index];
    });

    return this;
  }
}
