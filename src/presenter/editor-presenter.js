import CreatorPresenter from './creator-presenter';
import Mode from '../enum/mode';
import PointView from '../view/point-view';

/**
 * @template {ApplicationModel} Model
 * @template {EditorView} View
 * @extends CreatorPresenter<Model,View>
 */
export default class EditorPresenter extends CreatorPresenter {
  /**
   * @override
   */
  _saveCurrentPoint() {
    return this.model.pointsModel.update(this.model.currentPoint.id, this.model.currentPoint);
  }

  /**
   * @override
   */
  _onModelMode() {
    this.view.close(false);

    if (this.model.getMode() === Mode.EDIT) {
      const pointView = PointView.findById(this.model.currentPoint.id);

      this._updateView();

      this.view.target(pointView).open();
    }
  }

  _deleteCurrentPoint() {
    return this.model.pointsModel.remove(this.model.currentPoint.id);
  }

  /**
   * @override
   * @param {Event} event
   */
  async _onViewReset(event) {
    event.preventDefault();

    this.view.setDeleting(true);

    try {
      await this._deleteCurrentPoint();

      this.view.close();
    }

    catch (exception) {
      this.view.shake();
    }

    this.view.setDeleting(false);
  }
}
