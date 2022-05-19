const getRandomDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  return date;
};

export const readingMock = [
  {
    points: 899,
    ppm: 934,
    date: getRandomDate(),
    comprehension: 80,
  },
  {
    points: 899,
    ppm: 934,
    date: getRandomDate(),
    comprehension: 80,
  },
  {
    points: 844,
    words: 15,
    ppm: 934,
    date: getRandomDate(),
    comprehension: 80,
  },
  {
    points: 837,
    words: 15,
    ppm: 934,
    date: getRandomDate(),
    comprehension: 80,
  },
  {
    points: 837,
    words: 15,
    ppm: 934,
    date: getRandomDate(),
    comprehension: 80,
  },
  {
    points: 837,
    words: 15,
    ppm: 934,
    date: getRandomDate(),
    comprehension: 80,
  },
  {
    points: 837,
    words: 15,
    ppm: 934,
    date: getRandomDate(),
    comprehension: 80,
  },
  {
    points: 837,
    words: 15,
    ppm: 934,
    date: getRandomDate(),
    comprehension: 80,
  },
  {
    points: 837,
    words: 15,
    ppm: 934,
    date: getRandomDate(),
    comprehension: 80,
  },
  {
    points: 837,
    words: 15,
    ppm: 934,
    date: getRandomDate(),
    comprehension: 80,
  },
  {
    points: 837,
    words: 15,
    ppm: 934,
    date: getRandomDate(),
    comprehension: 80,
  },
];
