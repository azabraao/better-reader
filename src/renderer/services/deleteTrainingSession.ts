const deleteTrainingSession = async (id: string): Promise<TrainingSession> => {
  return new Promise((resolve) => {
    window.electron.api.trainingSession.delete(id);

    window.electron.ipcRenderer.once(
      'delete-training-session',
      (arg: TrainingSession) => {
        console.log('delete-training-session', arg);
        resolve(arg);
      }
    );
  });
};

export default deleteTrainingSession;
