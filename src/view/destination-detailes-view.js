import ComponentView, {html} from './component-view.js';

export default class DestinationDetailesView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('event__section', 'event__section--destination');
    this.picturesContainer = this.querySelector('.event__photos-tape');
  }

  /**
   * @override
   */
  createAdjacentHtml(description) {
    return html`
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
          <!---фотографии--->
          </div>
        </div>
      </section>
    `;
  }

  /**
   * @param  {...any} views
   */
  replacePictures(...views) {
    this.querySelector('.event__photos-tape').replaceChildren(...views.map(this.createPictureView,this));

    return this;
  }

  /**
   * @param {Picture} picture
   */
  createPictureView(picture) {
    const view = new Image();

    view.src = picture.src;
    view.className = 'event__photo';
    view.alt = picture.description;

    return view;
  }

  /**
   * @param {string} description
   */
  setDescription(description) {
    this.querySelector('.event__destination-description').textContent = description;

    return this;
  }

  hide() {
    this.style.display = 'none';

    return this;
  }
}

customElements.define(String(DestinationDetailesView), DestinationDetailesView);
