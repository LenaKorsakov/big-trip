import Presenter from './presenter';
import Filter from '../enum/filter';
import SortCompare from '../enum/sort-compare';
import FilterLabel from '../enum/filter-label';
import FilterPredicate from '../enum/filter-predicate';
import FilterDisabled from '../enum/filter-disabled';
import Mode from '../enum/mode';

/**
 * @template {ApplicationModel} Model
 * @template {FilterSelectView} View
 * @extends Presenter<Model,View>
 */
export default class FilterSelectPresenter extends Presenter {
  #currentFilter = Filter.EVERYTHING;

  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.model.addEventListener('mode', () => {
      const flags = Object.values(FilterDisabled);

      if (this.model.getMode() !== Mode.VIEW) {
        flags.fill(true);
      }
      this.view.setOptionsDisabled(flags);
    });

    this.#buildFilterSelectView().addEventListener('change', this.onFilterChange.bind(this));
  }

  #buildFilterSelectView() {
    const filterOptions = Object.keys(Filter).map((key) => [FilterLabel[key], Filter[key]]);
    const filterKey = FilterPredicate.findKey(this.model.points.getFilter());

    return this.view
      .setOptions(filterOptions)
      .setValue(Filter[filterKey]);
  }

  onFilterChange() {
    const filterKey = this.view.getValue().toUpperCase();

    this.model.points.setFilter(FilterPredicate[filterKey]);
  }
}
