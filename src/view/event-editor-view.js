import BaseView from './base-view';
import createAdjacentHtml from './event-editor-template';

/**
 * Trip event editor
 */
export default class EventEditorView extends BaseView {
  /**
   * @override
   */
  createAdjacentHtml() {
    return createAdjacentHtml();
  }
}

customElements.define('trip-event-editor', EventEditorView);
