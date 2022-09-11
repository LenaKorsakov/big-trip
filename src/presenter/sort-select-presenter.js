import Presenter from './presenter';
import Sort from '../enum/sort';
import SortLabel from '../enum/sort-label';
import SortCompare from '../enum/sort-compare';
import SortDisabled from '../enum/sort-disabled';
import Mode from '../enum/mode';

/**
 * @template {ApplicationModel} Model
 * @template {SortSelectView} View
 * @extends Presenter<Model,View>
 */
export default class SortSelectPresenter extends Presenter{
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.model.addEventListener('mode', () => {
      const flags = Object.values(SortDisabled);

      if (this.model.getMode() !== Mode.VIEW) {
        flags.fill(true);
      }
      this.view.setOptionsDisabled(flags);
    });

    this.#buildSortSelectView().addEventListener('change', this.onSortChange.bind(this));
  }

  #buildSortSelectView() {
    const flags = Object.values(SortDisabled);
    const sortOptions = Object.keys(Sort).map((key) => [SortLabel[key], Sort[key]]);
    const sortKey = SortCompare.findKey(this.model.points.getSort());

    return this.view
      .setOptions(sortOptions)
      .setValue(Sort[sortKey])
      .setOptionsDisabled(flags);
  }

  onSortChange() {
    const key = this.view.getValue().toUpperCase();

    this.model.points.setSort(SortCompare[key]);
  }
}
