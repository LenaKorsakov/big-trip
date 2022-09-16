/** @typedef {import('flatpickr/dist/types/instance').Instance} Calendar */
/** @typedef {import('flatpickr/dist/types/options').DateOption} CalendarDate */
/** @typedef {import('flatpickr/dist/types/options').Options} CalendarOptions */

/** @typedef {import('./destination-view').DestinationPictureState} DestinationPictureState */
/** @typedef {import('./destination-select-view').DestinationOptionState} DestinationOptionState */
/** @typedef {import('./offer-select-view').OfferSelectState} OfferSelectState */
/** @typedef {import('./offer-toggle-view').OfferToggleState} OfferToggleState  */
/** @typedef {import('./sort-select-view').SortOptionState} SortOptionState */
/** @typedef {import('./list-view').default} ListView*/
/** @typedef {import('./editor-view').default} EditorView */

/** @typedef {[label: string, value: PointType]} TypeOptionState  */
/** @typedef {[title: string, price: string, isChecked: boolean][]} OfferSelectState  */
/** @typedef {[title: string, price: string]} OfferToggleState  */
/** @typedef {[label: string, value: string]} SortOptionState  */
/** @typedef {[label: string, value: string]} FilterOptionState  */
/** @typedef {[string, string][]} DestinationOptionState  */
/** @typedef {[URL, string][]} DestinationPictureState  */

/**
 * @typedef PointState
 * @prop {number} id
 * @prop {string} isoStartDate
 * @prop {string} isoEndDate
 * @prop {string} startDate
 * @prop {string} title
 * @prop {string} icon
 * @prop {string} startTime
 * @prop {string} endTime
 * @prop {string} price
 * @prop {OfferState[]} offers
 */
