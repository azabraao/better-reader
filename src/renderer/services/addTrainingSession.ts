type TrainingSessionPayload = {
  name: string;
  units: TrainingUnit[];
};

const addTrainingSession = async (
  payload: TrainingSessionPayload
): Promise<TrainingSession> => {
  return new Promise((resolve) => {
    window.electron.api.trainingSession.create(payload);

    window.electron.ipcRenderer.once(
      'create-training-session',
      (arg: TrainingSession) => {
        resolve(arg);
      }
    );
  });
};

export default addTrainingSession;
