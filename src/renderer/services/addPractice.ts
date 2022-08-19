const addPractice = async (payload: PracticePayload): Promise<PracticeItem> => {
  return new Promise((resolve) => {
    window.electron.api.practices.create(payload);

    window.electron.ipcRenderer.once('add-practice', (arg) => {
      resolve(arg);
    });
  });
};

export default addPractice;
