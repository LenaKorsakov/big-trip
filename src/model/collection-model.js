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
   * @param {number} value
   */
  findById(value) {
    return this.findBy('id', value);
  }

  /**
   * @param {string} key
   * @param {any} value
   */
  findIndexBy(key, value) {
    return this.listAll().findIndex((item) => item[key] === value);
  }

  /**
   * @param {number} value
   */
  findIndexById(value) {
    return this.findIndexBy('id', value);
  }

  /**
   *
   * @param {ItemAdapter} item
   */
  async add(item) {
    const newItem = await this.#store.add(item.toJSON());

    this.#items.push(newItem);

    this.dispatchEvent(new CustomEvent('add'));
  }

  /**
   * @param {number} id
   * @param {Item} item
   */
  async update(id, item) {
    const newItem = await this.#store.update(id, item);
    const index = this.findIndexById(id);

    this.#items.splice(index, 1, newItem);

    this.dispatchEvent(new CustomEvent('update'));
  }

  /**
   * @param {number} id
   */
  async remove(id) {
    await this.#store.remove(id);
    const index = this.findIndexById(id);

    this.#items.splice(index, 1);

    this.dispatchEvent(new CustomEvent('remove'));
  }
}
