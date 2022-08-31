import SortSelectView from '../view/sort-select-view';
import Sort from '../enum/sort';
import SortLabel from '../enum/sort-label';

export default class SortSelectPresenter {
  #currentSort = Sort.PRICE;

  constructor(model) {
    this.model = model;

    this.view = document.querySelector(String(SortSelectView));
    const sortOptions = Object.keys(Sort).map((key) => [SortLabel[key], Sort[key]]);
    this.view
      .setOptions(sortOptions)
      .select(Sort.PRICE)
      .setOptionsDisabled([false, true, true, false, true]);
  }
}
