import CreatorView from './creator-view';
import {html} from './view';
import SaveButtonLabel from '../enum/save-button-label';
import DeleteButtonLabel from '../enum/delete-button-label';

export default class EditorView extends CreatorView {
  constructor() {
    super();

    this.addEventListener('click', this._onClick);
  }

  /**
   * @override
   */
  createButtonsHtml() {
    return html`
      <button class="event__save-btn  btn  btn--blue" type="submit">
        ${SaveButtonLabel.DEFAULT}
      </button>
      <button class="event__reset-btn" type="reset">
        ${DeleteButtonLabel.DEFAULT}
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    `;
  }

  /**
   * @override
   */
  connect() {
    this._targetView.replaceWith(this);
  }

  /**
   * @override
   */
  disconnect() {
    this.replaceWith(this._targetView);
  }

  /**
   * @param {boolean} flag
   */
  setDeleteButtonPressed(flag) {
    /** @type {HTMLButtonElement} */
    const view = this.querySelector('.event__reset-btn');

    view.disabled = flag;
    view.textContent = flag ? DeleteButtonLabel.PRESSED : DeleteButtonLabel.DEFAULT;
  }

  /**
   * @override
   */
  _onReset(event) {
    event.preventDefault();
  }

  _onClick(event) {
    if (event.target.closest('.event__rollup-btn')) {
      this.close();
    }
  }
}

customElements.define(String(EditorView), EditorView);
