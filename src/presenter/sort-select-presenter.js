import Presenter from './presenter';
import Sort from '../enum/sort';
import SortLabel from '../enum/sort-label';
import SortCompare from '../enum/sort-compare';

/**
 * @template {ApplicationModel} Model
 * @template {SortSelectView} View
 * @extends Presenter<Model,View>
 */
export default class SortSelectPresenter extends Presenter{
  #currentSort = Sort.DAY;

  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);
    this.#buildSortSelectView().addEventListener('change', this.onSortChange.bind(this));
  }

  #buildSortSelectView() {
    const FLAGS = [false, true, true, false, true];
    const sortOptions = Object.keys(Sort).map((key) => [SortLabel[key], Sort[key]]);

    return this.view
      .setOptions(sortOptions)
      .setValue(this.#currentSort)
      .setOptionsDisabled(FLAGS);
  }

  onSortChange() {
    const key = this.view.getValue().toUpperCase();

    this.#currentSort = Sort[key];
    this.model.points.setSort(SortCompare[key]);
  }
}
