import './loader-view.css';

import View from './view.js';

export default class LoaderView extends View {
  constructor() {
    super();

    this.classList.add('loader');
  }

  /**
   * @override
   * @param {boolean} flag
   */
  display(flag, rootView = document.body) {
    if (flag) {
      rootView.append(this);
    } else {
      this.remove();
    }

    return this;
  }

}

customElements.define(String(LoaderView), LoaderView);
