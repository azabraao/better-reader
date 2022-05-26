export const monthNameByDate = (date: string): string => {
  const month = Number(date.split('/')[0]);

  const year = Number(date.split('/')[2]);

  const monthName = new Date(year, month - 1, 1).toLocaleString('default', {
    month: 'short',
  });

  return monthName;
};
