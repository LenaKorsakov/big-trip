import FilterSelectView from '../view/filter-select-view';
import FilterLabel from '../enum/filter-label';
import Filter from '../enum/filter';

export default class FilterSelectPresenter {
  #currentFilter = Filter.EVERYTHING;

  constructor(model) {
    this.model = model;

    this.view = document.querySelector(String(FilterSelectView));
    const filterOptions = Object.keys(Filter).map((key) => [FilterLabel[key], Filter[key]]);
    this.view
      .setOptions(filterOptions)
      .select(this.#currentFilter);

    this.view.addEventListener('click', this.onFilterClick.bind(this));
  }

  onFilterClick(event) {
    const filter = event.target.value;

    if (!event.target.closest('input')) {
      return;
    }
    if (this.#currentFilter === Filter[String(filter).toUpperCase()]) {
      return;
    }
    this.#currentFilter = filter;
    this.view.dispatchEvent(new CustomEvent(
      'filter-change',{
        detail: filter,
        bubbles: true}
    ));
  }
}
