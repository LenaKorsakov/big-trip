import dayjs from 'dayjs';

export const formatDateTime = (dueDate, template) => dayjs(dueDate).format(template);
export const formatNumber = (value, locale = 'en') => value.toLocaleString(locale);
