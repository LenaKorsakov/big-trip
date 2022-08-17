import dayjs from 'dayjs';

export const formatDate = (dueDate) => dayjs(dueDate).format('D MMM');
export const dateToHour = (dueDate) => dayjs(dueDate).format('HH:mm');
