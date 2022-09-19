import dayjs from 'dayjs';

const DATE_TEMPLATE = 'D MMM';
const HOUR_TEMPLATE = 'HH:mm';

export const formatStringToDate = (dueDate) => dayjs(dueDate).format(DATE_TEMPLATE);
export const formatStringToHour = (dueDate) => dayjs(dueDate).format(HOUR_TEMPLATE);
