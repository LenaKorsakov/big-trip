import CreatorPresenter from './creator-presenter';
import Mode from '../enum/mode';
import PointView from '../view/point-view';

/**
 * @template {ApplicationModel} Model
 * @template {CreatorView} View
 * @extends CreatorPresenter<Model,View>
 */
export default class EditorPresenter extends CreatorPresenter {
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.view.addEventListener('reset', this._onViewReset.bind(this));
  }

  /**
   * @override
   */
  _saveCurrentPoint() {
    return this.model.points.update(this.model.currentPoint.id, this.model.currentPoint);
  }

  /**
   * @override
   */
  async _onViewSubmit() {
    this.view.setSaveButtonPressed(true);
    this.view.setFormDisabled(true);

    try {
      await this._saveCurrentPoint();

      this.view.close();
    }

    catch (exception) {
      this.view.shake();
    }

    this.view.setSaveButtonPressed(false);
    this.view.setFormDisabled(false);
  }

  /**
   * @override
   */
  _onModelMode() {
    if (this.model.getMode() !== Mode.EDIT) {
      return;
    }

    const pointView = PointView.findById(this.model.currentPoint.id);

    this.view.close(true);

    this._updateView();

    this.view.target(pointView).open();
  }

  _deleteCurrentPoint() {
    return this.model.points.remove(this.model.currentPoint.id);
  }

  async _onViewReset() {
    this.view.setDeleteButtonPressed(true);
    this.view.setFormDisabled(true);

    try {
      await this._deleteCurrentPoint();

      this.view.close();
    }

    catch (exception) {
      this.view.shake();
    }

    this.view.setDeleteButtonPressed(false);
    this.view.setFormDisabled(false);
  }
}
