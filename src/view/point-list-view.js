import ComponentView from './component-view.js';
import PointView from './point-view.js';

export default class PointListView extends ComponentView {
  /**
   * @param {PointState[]} states
   */
  setItems(states) {
    const views = states.map((state) => new PointView(state));

    this.replaceChildren(...views);

    return this;
  }
}

customElements.define(String(PointListView), PointListView);
