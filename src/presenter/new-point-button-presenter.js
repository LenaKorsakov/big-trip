import Presenter from './presenter.js';
import Mode from '../enum/mode.js';

/**
 * @template {ApplicationModel} Model
 * @template {HTMLButtonElement} View
 * @extends Presenter<Model,View>
 */
export default class NewPointButtonPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.view.addEventListener('click', this.onViewClick.bind(this));

    this.model.addEventListener('mode', this.onModelMode.bind(this));
  }

  onViewClick() {
    this.model.setMode(Mode.CREATE);
  }

  onModelMode() {
    this.view.disabled = (this.model.getMode() !== Mode.VIEW);
  }
}
