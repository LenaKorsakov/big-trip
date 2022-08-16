import BaseView from './base-view';
import createAdjacentHtml from './point-editor-template';

/**
 * Trip event editor
 */
export default class PointEditorView extends BaseView {
  /**
   * @override
   */
  createAdjacentHtml() {
    return createAdjacentHtml();
  }
}

customElements.define('trip-event-editor', PointEditorView);
