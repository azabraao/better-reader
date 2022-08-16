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
  const response = await api.post('/practice', payload);

  return response.data;
};

export default addPractice;
