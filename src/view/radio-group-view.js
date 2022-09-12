import ComponentView from './component-view.js';

export * from './component-view.js';

export default class RadioGroupView extends ComponentView {
  get itemSelector() {
    return '[type=radio]';
  }

  getValue() {
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
    const views = this.querySelectorAll(this.itemSelector);

    views.forEach((view, index) => {
      view.disabled = flags[index];
    });

    return this;
  }
}
