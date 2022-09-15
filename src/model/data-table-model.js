import CollectionModel from './collection-model';

/**
 * @template Item
 * @template {Adapter} ItemAdapter
 * @extends CollectionModel<Item,ItemAdapter>
 */

export default class DataTableModel extends CollectionModel {
  /** @typedef {(item: ItemAdapter) => boolean} FilterPredicate */
  /** @typedef {(item: ItemAdapter, nextItem: ItemAdapter) => number} SortCompare */

  /**
   * @type {FilterPredicate}
   */
  #filter = () => true;

  /**
   * @type {SortCompare}
   */
  #sort = () => 0;

  /**
   * @param {FilterPredicate} predicate
   */
  setFilter(predicate) {
    this.#filter = predicate;

    this.dispatchEvent(new CustomEvent('filter'));

    return this;
  }

  getFilter() {
    return this.#filter;
  }

  /**
   * @param {SortCompare} compare
   */
  setSort(compare, silent = false) {
    this.#sort = compare;

    if (!silent) {
      this.dispatchEvent(new CustomEvent('sort'));
    }
    return this;
  }

  getSort() {
    return this.#sort;
  }

  list(predicate = this.getFilter(), compare = this.getSort()) {
    return this.listAll().filter(predicate).sort(compare);
  }
}
