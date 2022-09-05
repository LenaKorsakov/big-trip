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
      return response.json();
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
  //TODO методы add update remove
}
