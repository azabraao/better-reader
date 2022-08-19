const getPractices = async (): Promise<PracticeItem[]> => {
  return new Promise((resolve) => {
    window.electron.api.practices.readAll();

    window.electron.ipcRenderer.once('get-practices', (arg) => {
      resolve(arg);
    });
  });
};

export default getPractices;
