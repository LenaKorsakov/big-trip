import Presenter from './presenter';
import FilterPlaceholderMessage from '../enum/filter-placeholder';
import FilterPredicate from '../enum/filter-predicate';

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

    this.#updatePlaceholder();

    this.model.points.addEventListener(
      ['add', 'update', 'remove', 'filter'],
      this.onModelPointsChange.bind(this)
    );
  }

  #updatePlaceholder() {
    const key = FilterPredicate.findKey(this.model.points.getFilter());
    const message = FilterPlaceholderMessage[key];
    const isHidden = Boolean(this.model.points.list().length);

    this.view.hidden = isHidden;
    this.view.textContent = isHidden ? '' : message;
  }

  onModelPointsChange() {
    this.#updatePlaceholder();
  }
}
