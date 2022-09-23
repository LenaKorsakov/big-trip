/**
 * @template Item
 */
export default class Store {
  #baseUrl;
  #auth;

  constructor(baseUrl, auth) {
    this.#baseUrl = baseUrl;
    this.#auth = auth;
  }

  /**
   *  @return {Promise<Item[]>}
   */
  list() {
    return this.query('/', {
      method: 'get'
    });
  }

  /**
   * @param {Item} item
   * @return {Promise<Item>}
   */
  add(item) {
    return this.query('/', {
      method: 'post',
      body: JSON.stringify(item)
    });
  }

  /**
   * @param {string} id
   * @param {Item} item
   * @return {Promise<Item>}
   */
  update(id, item) {
    return this.query(`/${id}`, {
      method: 'put',
      body: JSON.stringify(item)
    });
  }

  /**
   * @param {string} id
   * @return {Promise<Item>}
   */
  remove(id) {
    return this.query(`/${id}`, {
      method: 'delete'
    });
  }

  /**
   *
   * @param {string} path
   * @param {RequestInit} options
   */
  async query(path, options = {}) {
    const url = this.#baseUrl + path;
    const headers = {
      'authorization': this.#auth,
      'content-type': 'application/json',
      ...options.headers
    };
    const response = await fetch(url, {...options, headers});
    const {assert, parse} = /** @type {typeof Store} */ (this.constructor);

    await assert(response);

    return parse(response);
  }

  /**
   * @param {Response} response
   */
  static async assert(response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }

  /**
   * @param {Response} response
   */
  static parse(response) {
    if (response.headers.get('content-type').startsWith('application/json')) {
      return response.json();
    }

    return response.text();
  }
}
