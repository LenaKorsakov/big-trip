/** @typedef {import('./adapter').default} Adapter */
/** @typedef {import('./destination-adapter').default} DestinationAdapter */
/** @typedef {import('./offer-group-adapter').default} OfferGroupAdapter */
/** @typedef {import('./point-adapter').default} PointAdapter */


/**
 * @typedef Point
 * @prop {number} base_price
 * @prop {string} startDate
 * @prop {string} date_from
 * @prop {string} date_to
 * @prop {number} destination
 * @prop {string} id
 * @prop {number[]} offers
 * @prop {PointType} type
 * @prop {boolean} is_favorite
 */


/**
 * @typedef LocalPoint
 * @prop {number} base_price
 * @prop {string} date_from
 * @prop {string} date_to
 * @prop {number} destination
 * @prop {number[]} offers
 * @prop {PointType} type
 */

/**
 * @typedef Destination
 * @prop {number} id
 * @prop {string} description
 * @prop {string} name
 * @prop {Picture[]} pictures
 */


/**
 * @typedef Picture
 * @prop {string} src
 * @prop {string} description
 */

/**
 * @typedef OfferGroup
 * @prop {PointType} type
 * @prop {Offer[]} offers
 */

/**
 * @typedef {string} PointType
 */

/**
 * @typedef Offer
 * @prop {number} id
 * @prop {string} title
 * @prop {number} price
 */
