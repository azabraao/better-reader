import { api } from './api';

type TrainingSessionPayload = {
  name: string;
  units: TrainingUnit[];
};

const addTrainingSession = async (
  payload: TrainingSessionPayload
): Promise<TrainingSessionPayload[]> => {
  const response = await api.post('/training-sessions', {
    ...payload,
    // should be removed when backend is made
    summary: {
      target: 1000,
      techniques: ['swiping', 'end-to-end'],
      duration: 3000,
    },
  });

  return response.data;
};

export default addTrainingSession;
