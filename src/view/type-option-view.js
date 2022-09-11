// import ComponentView, {html} from './component-view.js';

// export default class TypeOptionView extends ComponentView {
//   /**
//    * @param {TypeOptionState} state
//    */
//   constructor(...state) {
//     super(...state);

//     this.classList.add('event__type-item');
//   }

//   /**
//    * @override
//    * @param {TypeOptionState} state
//    */
//   createAdjacentHtml(...state) {
//     const [label, value] = state;
//     return html`
//       <input
//         id="event-type-${value}-1"
//         class="event__type-input  visually-hidden"
//         type="radio"
//         name="event-type"
//         value="${value}"
//       >
//       <label class="event__type-label  event__type-label--${value}" for="event-type-${value}-1">
//         ${label}
//       </label>
//     `;
//   }
// }

// customElements.define(String(TypeOptionView), TypeOptionView);
