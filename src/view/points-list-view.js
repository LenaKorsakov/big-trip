import { createElement } from '../render.js';

const crreateTripPointsListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TripPointsListView {
  getTemplate() {
    return crreateTripPointsListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());//откуда взялся element
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
