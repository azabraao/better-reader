const getTrainingSessions = async (): Promise<TrainingSession[]> => {
  return new Promise((resolve) => {
    window.electron.api.trainingSession.readAll();

    window.electron.ipcRenderer.once(
      'read-all-training-session',
      (arg: TrainingSession[]) => {
        resolve(arg);
      }
    );
  });
};

export default getTrainingSessions;
