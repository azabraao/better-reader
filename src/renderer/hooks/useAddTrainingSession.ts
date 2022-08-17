const useAddTrainingSession = () => {
  const channel = new BroadcastChannel('training-session');

  const openAddTrainingSession = () => {
    channel.postMessage({ shouldOpen: true });
  };
  const closeAddTrainingSession = () => {
    channel.postMessage({ shouldOpen: false });
  };

  return { openAddTrainingSession, closeAddTrainingSession };
};

export default useAddTrainingSession;
