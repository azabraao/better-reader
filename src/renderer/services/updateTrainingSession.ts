type UpdateTrainingSessionPayload = {
  name: string;
  units: TrainingUnit[];
};

const addTrainingSession = async (
  payload: UpdateTrainingSessionPayload
): Promise<TrainingSession> => {
  return new Promise((resolve) => {
    window.electron.api.trainingSession.update(payload);

    window.electron.ipcRenderer.once(
      'update-training-session',
      (arg: TrainingSession) => {
        resolve(arg);
      }
    );
  });
};

export default addTrainingSession;
