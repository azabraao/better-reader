import { api } from './api';

const getTrainingSessions = async (): Promise<TrainingSession[]> => {
  const response = await api.get('/training-sessions');

  return response.data;
};

export default getTrainingSessions;
