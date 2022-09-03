import SortSelectView from '../view/sort-select-view';
import Sort from '../enum/sort';
import SortLabel from '../enum/sort-label';

export default class SortSelectPresenter {
  #currentSort = Sort.DAY;

  constructor(model) {
    this.model = model;
    this.view = document.querySelector(String(SortSelectView));

    this.#buildSortSelectView().addEventListener('click', this.onSortClick.bind(this));
  }

  #buildSortSelectView() {
    const sortOptions = Object.keys(Sort).map((key) => [SortLabel[key], Sort[key]]);
    const flags = [false, true, true, false, true];

    return this.view
      .setOptions(sortOptions)
      .setValue(Sort.DAY)
      .setOptionsDisabled(flags);

  }

  onSortClick() {
    const sort = this.view.getValue();

    if (this.#currentSort === Sort[String(sort).toUpperCase()]) {
      return;
    }
    this.#currentSort = sort;
    this.view.dispatchEvent(new CustomEvent('sort-select',{
      detail: sort,
      bubbles: true}
    ));
  }
}
