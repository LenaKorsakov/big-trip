import dayjs from 'dayjs';

/**
 * @param {string} dueDate
 * @param {string} template
 */
export const formatDateTime = (dueDate, template) => dayjs(dueDate).format(template);

/**
 * @param {number} value
 */
export const formatNumber = (value, locale = 'en') => value.toLocaleString(locale);
