/** @typedef {import('flatpickr/dist/types/instance').Instance} Calendar */
/** @typedef {import('flatpickr/dist/types/options').DateOption} CalendarDate */
/** @typedef {import('flatpickr/dist/types/options').Options} CalendarOptions */

/** @typedef {import('./list-view').default} ListView*/
/** @typedef {import('./point-view').default} PointView */
/** @typedef {import('./creator-view').default} CreatorView */
/** @typedef {import('./filter-view').default} FilterView */
/** @typedef {import('./sort-view').default} SortView */
/** @typedef {import('./editor-view').default} EditorView */

/** @typedef {[label: string, value: PointType]} PointTypeOptionState  */
/** @typedef {[title: string, price: string, id: number, isChecked: boolean]} OfferOptionState  */
/** @typedef {[title: string, price: string]} OfferState  */
/** @typedef {[label: string, value: string]} SortOptionState  */
/** @typedef {[label: string, value: string]} FilterOptionState  */
/** @typedef {[label: string, value: string]} DestinationOptionState  */
/** @typedef {[src: string, alt: string]} DestinationPictureState  */

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
