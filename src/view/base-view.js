export default class BaseView extends HTMLElement {
  constructor() {
    super();

    this.insertAdjacentHTML('beforeend', this.createAdjacentHtml(...arguments));
  }

  createAdjacentHtml() {
    return '';
  }
}

