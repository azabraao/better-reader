type EditTrainingSessionPayload = {
  id: string;
  name: string;
  units: TrainingUnit[];
};

const updateTrainingSession = async (
  payload: EditTrainingSessionPayload
): Promise<TrainingSession> => {
  return new Promise((resolve) => {
    const { id } = payload;
    const data = {
      name: payload.name,
      units: payload.units,
    };

    window.electron.api.trainingSession.update(id, data);

    window.electron.ipcRenderer.once(
      'update-training-session',
      (arg: TrainingSession) => {
        resolve(arg);
      }
    );
  });
};

export default updateTrainingSession;
