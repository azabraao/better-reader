type TrainingSessionPayload = {
  name: string;
  units: TrainingUnit[];
};

const addTrainingSession = async (
  payload: TrainingSessionPayload
): Promise<TrainingSession> => {
  return new Promise((resolve, reject) => {
    window.electron.api.trainingSession.create(payload);

    window.electron.ipcRenderer.once('create-training-session', (arg) => {
      resolve(arg);
    });
  });
};

export default addTrainingSession;
