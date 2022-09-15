import View from './view.js';

export * from './view.js';

export default class ListView extends View {
  constructor() {
    super(...arguments);

    this.classList.add('trip-events__list');
  }
}
