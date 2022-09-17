import View, {html} from './view.js';

export default class DestinationView extends View {
  /**
 * @param  {State} state
 */
  constructor(...state) {
    super(...state);

    this.classList.add('event__section', 'event__section--destination');
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description"></p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
          <!---фотографии--->
          </div>
        </div>
    `;
  }

  /**
   * @param  {DestinationPictureState[]} states
   */
  setPictures(states) {
    this.querySelector('.event__photos-tape').innerHTML = html`${
      states.map((state) => this.#createPictureHTML(...state))
    }`;

    return this;
  }

  /**
   * @param {string} value
   */
  setDescription(value) {
    this.querySelector('.event__destination-description').textContent = value;

    return this;
  }

  #createPictureHTML(...state) {
    const [src,alt] = state;

    return html`<img class="event__photo" src=${src} alt=${alt}>`;
  }
}

customElements.define(String(DestinationView), DestinationView);
