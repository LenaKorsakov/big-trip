import dayjs from 'dayjs';

const template = 'DD/MM/YY HH:mm';

export const formatStringToDate = (dueDate) => dayjs(dueDate).format('D MMM');
export const formatStringToHour = (dueDate) => dayjs(dueDate).format('HH:mm');
export const formatStringToFullFDate = (dueDate) => dayjs(dueDate).format(template);
