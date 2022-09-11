import Presenter from './presenter';
import Filter from '../enum/filter';
import FilterLabel from '../enum/filter-label';
import FilterPredicate from '../enum/filter-predicate';

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

    this.#buildFilterSelectView().addEventListener('change', this.onFilterChange.bind(this));
  }

  #buildFilterSelectView() {
    const filterOptions = Object.keys(Filter).map((key) => [FilterLabel[key], Filter[key]]);

    return this.view
      .setOptions(filterOptions)
      .setValue(this.#currentFilter);
  }

  onFilterChange() {
    const key = this.view.getValue().toUpperCase();

    this.#currentFilter = Filter[key];
    this.model.points.setFilter(FilterPredicate[key]);
  }
}
