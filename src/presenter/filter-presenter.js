import Presenter from './presenter';
import FilterType from '../enum/filter-type';
import FilterLabel from '../enum/filter-label';
import FilterPredicate from '../enum/filter-predicate';
import FilterDisabled from '../enum/filter-disabled';
import Mode from '../enum/mode';

/**
 * @template {ApplicationModel} Model
 * @template {FilterSelectView} View
 * @extends Presenter<Model,View>
 */
export default class FilterPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.model.addEventListener('mode', this.#onModelMode.bind(this));

    this.#buildFilterView().addEventListener('change', this.#onFilterChange.bind(this));
  }

  #buildFilterView() {
    const filterOptions = Object.keys(FilterType).map((key) => [FilterLabel[key], FilterType[key]]);
    const filterKey = FilterPredicate.findKey(this.model.points.getFilter());

    return this.view
      .setOptions(filterOptions)
      .setValue(FilterType[filterKey]);
  }

  #onFilterChange() {
    const filterKey = this.view.getValue().toUpperCase();

    this.model.points.setFilter(FilterPredicate[filterKey]);
  }

  #onModelMode() {
    const flags = Object.values(FilterDisabled);

    if (this.model.getMode() !== Mode.VIEW) {
      flags.fill(true);
    }
    this.view.setOptionsDisabled(flags);
  }
}
