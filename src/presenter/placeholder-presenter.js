import Presenter from './presenter';
import FilterPlaceholder from '../enum/filter-placeholder';
import FilterPredicate from '../enum/filter-predicate';
import Mode from '../enum/mode';

/**
 * @template {ApplicationModel} Model
 * @template {HTMLParagraphElement} View
 * @extends Presenter<Model,View>
 */
export default class PlaceholderPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.#updateView();

    this.model.addEventListener('mode', this.#onModelMode.bind(this));
    this.model.pointsModel.addEventListener(['add', 'remove', 'filter'], this.#onModelPointsChange.bind(this));
  }

  #updateView() {
    const predicate = this.model.pointsModel.getFilter();
    const message = FilterPlaceholder[FilterPredicate.findKey(predicate)];

    const {length} = this.model.pointsModel.list();
    const isHidden = Boolean(length) || (this.model.getMode() === Mode.CREATE);

    this.view.hidden = isHidden;
    this.view.textContent = isHidden ? '' : message;
  }

  #onModelMode() {
    this.#updateView();
  }

  #onModelPointsChange() {
    this.#updateView();
  }
}
