import Presenter from './presenter';
import SortType from '../enum/sort-type';
import SortLabel from '../enum/sort-label';
import SortCompare from '../enum/sort-compare';
import SortDisabled from '../enum/sort-disabled';
import Mode from '../enum/mode';

/**
 * @template {ApplicationModel} Model
 * @template {SortView} View
 * @extends Presenter<Model,View>
 */
export default class SortPresenter extends Presenter{
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.#buildView();

    this.view.addEventListener('change', this.#onViewChange.bind(this));

    this.model.pointsModel.addEventListener(['add', 'remove', 'filter'], this.#onPointsModelChange.bind(this));
  }

  #buildView() {
    const flags = Object.values(SortDisabled);
    /** @type {SortOptionState[]} */
    const sortOptions = Object.keys(SortType).map((key) => [SortLabel[key], SortType[key]]);

    this.view
      .setOptions(sortOptions)
      .setOptionsDisabled(flags);

    this.#updateView();
  }

  #updateView() {
    const sortKey = SortCompare.findKey(this.model.pointsModel.getSort());

    this.view.setValue(SortType[sortKey]);
    this.view.hidden = !this.model.pointsModel.list().length;
  }

  #onViewChange() {
    const sortKey = SortType.findKey(this.view.getValue());

    this.model.setMode(Mode.VIEW);
    this.model.pointsModel.setSort(SortCompare[sortKey]);
  }

  /**
   * @param {Event} event
   */
  #onPointsModelChange(event){
    if (event.type === 'filter') {
      this.model.pointsModel.setSort(SortCompare.DAY, false);
    }

    this.#updateView();
  }
}
