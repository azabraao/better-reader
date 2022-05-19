export const ifSpaceBar = (
  event: React.KeyboardEvent<HTMLDivElement>,
  callback: () => void
) => {
  if (event.keyCode === 32) {
    callback();
  }
};
