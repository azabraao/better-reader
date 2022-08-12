import { api } from './api';

const getTrainingSession = async (): Promise<TrainingSession[]> => {
  const response = await api.get('/training-sessions');

  return response.data;
};

export default getTrainingSession;
