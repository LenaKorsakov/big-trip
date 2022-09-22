import CollectionModel from './collection-model';

/**
 * @template Item
 * @template {Adapter} ItemAdapter
 * @extends CollectionModel<Item,ItemAdapter>
 */
export default class DataTableModel extends CollectionModel {
  /**
   * @type {Predicate<ItemAdapter>}
   */
  #filter = () => true;

  /**
   * @type {Compare<ItemAdapter>}
   */
  #sort = () => 0;

  /**
   * @param {Predicate<ItemAdapter>} predicate
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
   * @param {Compare<ItemAdapter>} compare
   */
  setSort(compare, notify = true) {
    this.#sort = compare;

    if (notify) {
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
