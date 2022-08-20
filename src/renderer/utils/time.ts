export const millisecondsToMinutes = (milliseconds: number | string) => {
  return Number(milliseconds) / 1000 / 60;
};

export const minutesToMilliseconds = (minutes: number | string) => {
  return Number(minutes) * 60 * 1000;
};
