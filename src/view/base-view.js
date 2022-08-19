export default class BaseView extends HTMLElement {
  constructor() {
    super();

    this.insertAdjacentHTML('beforeend', this.createAdjacentHtml(...arguments));
  }

  /**
   * Создаст дополнительную HTML-разметку
   */
  createAdjacentHtml() {
    return '';
  }
}

