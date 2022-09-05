import FilterSelectView from '../view/filter-select-view';
import FilterLabel from '../enum/filter-label';
import Filter from '../enum/filter';

export default class FilterSelectPresenter {
  #currentFilter = Filter.EVERYTHING;

  constructor(model) {
    this.model = model;
    this.view = document.querySelector(String(FilterSelectView));

    this.#buildFilterSelectView().addEventListener('click', this.onFilterClick.bind(this));
  }

  #buildFilterSelectView() {
    const filterOptions = Object.keys(Filter).map((key) => [FilterLabel[key], Filter[key]]);

    return this.view
      .setOptions(filterOptions)
      .setValue(this.#currentFilter);
  }

  onFilterClick() {
    const filter = this.view.getValue();

    if (this.#currentFilter === Filter[String(filter).toUpperCase()]) {
      return;
    }
    this.#currentFilter = filter;
    this.view.dispatchEvent(new CustomEvent('filter-select',{
      detail: filter,
      bubbles: true}
    ));
  }
}
