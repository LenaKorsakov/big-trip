import View from './view.js';
import './loader-view.css';

/**
 * @implements {EventListenerObject}
 */
export default class LoaderView extends View {
  constructor() {
    super();

    this.rootView = document.body;
    this.classList.add('loader');
  }

  /**
   * @override
   * @param {boolean} flag
   */
  display(flag) {
    if (flag) {
      this.rootView.append(this);
      this.rootView.addEventListener('keydown', this);
    } else {
      this.remove();
      this.rootView.removeEventListener('keydown', this);
    }

    return this;
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    event.preventDefault();
  }

}

customElements.define(String(LoaderView), LoaderView);
