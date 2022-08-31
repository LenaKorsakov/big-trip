import dayjs from 'dayjs';

export const isDateInFuture = (startDate, endDate) =>
  dayjs(startDate).isSame(dayjs(), 'D MMM') ||
  dayjs(startDate).isAfter(dayjs(), 'D MMM') ||
  dayjs(endDate).isAfter(dayjs(), 'D MMM');
