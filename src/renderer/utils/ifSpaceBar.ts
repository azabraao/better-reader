export const ifSpaceBar = (
  event: React.KeyboardEvent<HTMLDivElement>,
  callback:
    | VoidFunction
    | ((
        e:
          | React.KeyboardEvent<HTMLDivElement>
          | React.MouseEvent<HTMLDivElement>
      ) => void)
) => {
  if (event.key === ' ') {
    event.preventDefault();
    callback(event);
  }
};
