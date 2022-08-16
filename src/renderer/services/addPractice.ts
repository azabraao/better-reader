import { api } from './api';

type PracticePayload = {
  words: number;
  ppm: number;
  comprehension: number;
  techniques: Technique[];
};

const addPractice = async (
  payload: PracticePayload
): Promise<PracticePayload[]> => {
  const response = await api.post('/practices', {
    ...payload,
    // temporary fix for backend not handling date yet
    date: '01/01/2020',
  });

  return response.data;
};

export default addPractice;
