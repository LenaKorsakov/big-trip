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

    //this.model.addEventListener('mode', this.#onModelMode.bind(this));
    this.model.pointsModel.addEventListener('filter', this.#onModelFilter.bind(this));
    this.model.pointsModel.addEventListener(['add','remove','filter'], this.#onModelPointsChange.bind(this));

    this.#buildSortView().addEventListener('change', this.#onSortChange.bind(this));
  }

  #buildSortView() {
    const flags = Object.values(SortDisabled);
    const sortOptions = Object.keys(SortType).map((key) => [SortLabel[key], SortType[key]]);
    const sortKey = SortCompare.findKey(this.model.pointsModel.getSort());

    return this.view
      .setOptions(sortOptions)
      .setValue(SortType[sortKey])
      .setOptionsDisabled(flags);
  }

  #setVisibility() {
    const isHidden = Boolean(this.model.pointsModel.list().length);

    this.view.hidden = !isHidden;
  }

  #onSortChange() {
    const sortKey = this.view.getValue().toUpperCase();

    this.model.pointsModel.setSort(SortCompare[sortKey]);
    this.model.setMode(Mode.VIEW);
  }

  #onModelFilter() {
    this.view.setValue(SortType.DAY);
    this.model.pointsModel.setSort(SortCompare.DAY, true);
  }

  #onModelPointsChange(){
    this.#setVisibility();
  }

  // #onModelMode() {
  //   const flags = Object.values(SortDisabled);

  //   if (this.model.getMode() !== Mode.VIEW) {
  //     flags.fill(true);
  //   }
  //   this.view.setOptionsDisabled(flags);
  // }
}
