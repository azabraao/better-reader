const useUpdateTrainingSession = () => {
  const channel = new BroadcastChannel('update-training-session');

  const openUpdateTrainingSession = (session: TrainingSession) => {
    channel.postMessage({ shouldOpen: true, session });
  };
  const closeUpdateTrainingSession = () => {
    channel.postMessage({ shouldOpen: false });
  };

  return { openUpdateTrainingSession, closeUpdateTrainingSession };
};

export default useUpdateTrainingSession;
