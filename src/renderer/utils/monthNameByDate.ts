export const monthNameByDate = (date: Date): string => {
  const monthName = new Date(date).toLocaleString('default', {
    month: 'long',
  });

  return monthName;
};
