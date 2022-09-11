import Model from './model';

/**
 * @template Item
 * @template {Adapter} ItemAdapter
 */
export default class CollectionModel extends Model {
  #store;
  #adapt;

  /** @type {Item[]} */
  #items;

  /**
   * @param {Store<Item>} store
   * @param {(item: Item) => ItemAdapter} adapt
   */
  constructor(store, adapt) {
    super();

    this.#store = store;
    this.#adapt = adapt;
  }

  /**
   * @override
   */
  async ready() {
    if (!this.#items) {
      this.#items = await this.#store.list();
    }
  }

  listAll() {
    return this.#items.map(this.#adapt);
  }

  /**
   * @param {string} key
   * @param {any} value
   */
  findBy(key, value) {
    return this.listAll().find((item) => item[key] === value);
  }

  /**
   * @param {any} value
   */
  findById(value) {
    return this.findBy('id', value);
  }

  update() {
    this.dispatchEvent(new CustomEvent('update'));

    return this;
  }

  add() {
    this.dispatchEvent(new CustomEvent('add'));

    return this;
  }

  remove() {
    this.dispatchEvent(new CustomEvent('remove'));

    return this;
  }
  //TODO доработать add update remove
}
