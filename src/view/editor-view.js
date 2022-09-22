import CreatorView from './creator-view';
import {html} from './view';
import SaveButtonLabel from '../enum/save-button-label';
import DeleteButtonLabel from '../enum/delete-button-label';

export default class EditorView extends CreatorView {
  constructor() {
    super();

    this.addEventListener('click', this.#onClick);
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
     * @param {boolean} flag
     */
  display(flag) {
    this.id = this._targetView?.id;
    (flag ? this._targetView : this).replaceWith(flag ? this : this._targetView);

    return this;
  }

  /**
   * @param {boolean} flag
   */
  setDeleting(flag) {
    this.querySelector('.event__reset-btn').textContent = flag ?
      DeleteButtonLabel.PRESSED :
      DeleteButtonLabel.DEFAULT;

    this.setDisabled(flag);
  }

  /**
   * @param {MouseEvent & {target: Element}} event
   */
  #onClick(event) {
    if (event.target.closest('.event__rollup-btn')) {
      this.close();
    }
  }
}

customElements.define(String(EditorView), EditorView);
