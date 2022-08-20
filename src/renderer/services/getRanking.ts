const getRanking = async (payload: RankingPayload): Promise<RankData> => {
  return new Promise((resolve) => {
    window.electron.api.practices.rank(payload);

    window.electron.ipcRenderer.once('get-rank', (arg: RankData) => {
      console.log('arg>>>', arg);

      resolve(arg);
    });
  });
};

export default getRanking;
