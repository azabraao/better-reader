export const calculatePracticePoints = ({
  wpm,
  words = 0,
  comprehension,
}: {
  wpm: number;
  words: number;
  comprehension: number;
}) => {
  return Math.round(wpm + words * 0.5 * comprehension * 1);
};
