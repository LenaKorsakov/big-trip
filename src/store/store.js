import StoreError from './store-error';

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
   *
   * @param {URL} path
   * @param {RequestInit} options
   */
  query(path, options = {}) {
    const url = this.#baseUrl + path;
    const headers = {
      'authorization': this.#auth,
      'content-type': 'application/json',
      ...options.headers
    };

    return fetch(url, {...options, headers}).then((response) => {
      if (!response.ok) {
        throw new StoreError(response);
      }

      if (response.headers.get('content-type').startsWith('application/json')) {
        return response.json();
      }

      return response.text();
    });
  }

  /**
   * @return {Promise<Item[]>}
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
   * @param {number} id
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
   * @param {number} id
   * @param {Item} item
   * @return {Promise<Item>}
   */
  remove(id) {
    return this.query(`/${id}`, {
      method: 'delete'
    });
  }
}
