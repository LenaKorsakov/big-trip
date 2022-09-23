import dayjs from 'dayjs';

/**
 * @param {string} date
 */
export const formatDate = (date, template = 'D MMM') => dayjs(date).format(template);

/**
 * @param {string} date
 */
export const formatTime = (date, template = 'HH:mm') => dayjs(date).format(template);

/**
 * @param {number} value
 */
export const formatNumber = (value, locale = 'en') => value.toLocaleString(locale);
