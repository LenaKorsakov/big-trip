import Presenter from './presenter';
import SortType from '../enum/sort-type';
import SortLabel from '../enum/sort-label';
import SortCompare from '../enum/sort-compare';
import SortDisabled from '../enum/sort-disabled';
import Mode from '../enum/mode';

/**
 * @template {ApplicationModel} Model
 * @template {SortSelectView} View
 * @extends Presenter<Model,View>
 */
export default class SortPresenter extends Presenter{
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.#setVisibility();

    this.model.addEventListener('mode', this.#onModelMode.bind(this));
    this.model.points.addEventListener('filter', this.#onModelFilter.bind(this));
    this.model.points.addEventListener(['add','remove','filter'], this.#onModelPointsChange.bind(this));

    this.#buildSortView().addEventListener('change', this.#onSortChange.bind(this));
  }

  #buildSortView() {
    const flags = Object.values(SortDisabled);
    const sortOptions = Object.keys(SortType).map((key) => [SortLabel[key], SortType[key]]);
    const sortKey = SortCompare.findKey(this.model.points.getSort());

    return this.view
      .setOptions(sortOptions)
      .setValue(SortType[sortKey])
      .setOptionsDisabled(flags);
  }

  #setVisibility() {
    const isHidden = Boolean(this.model.points.list().length);

    this.view.hidden = !isHidden;
  }

  #onModelMode() {
    const flags = Object.values(SortDisabled);

    if (this.model.getMode() !== Mode.VIEW) {
      flags.fill(true);
    }
    this.view.setOptionsDisabled(flags);
  }

  #onModelFilter() {
    this.view.setValue(SortType.DAY);
    this.model.points.setSort(SortCompare.DAY, true);
  }

  #onModelPointsChange(){
    this.#setVisibility();
  }

  #onSortChange() {
    const sortKey = this.view.getValue().toUpperCase();

    this.model.points.setSort(SortCompare[sortKey]);
  }
}
