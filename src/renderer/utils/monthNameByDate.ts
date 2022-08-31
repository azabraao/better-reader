export const monthNameByDate = (date: Date): string => {
  const monthName = new Date(date).toLocaleString('pt-BR', {
    month: 'long',
  });

  return monthName;
};
