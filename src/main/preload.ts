import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';
export type WindowAction = 'window-action';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels | WindowAction, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels | WindowAction, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels | WindowAction, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  api: {
    trainingSession: {
      create(payload: TrainingSessionPayload) {
        ipcRenderer.send('create-training-session', payload);
      },
      readAll() {
        ipcRenderer.send('read-all-training-session');
      },
      delete(id: string) {
        ipcRenderer.send('delete-training-session', id);
      },
    },
    practices: {
      create(payload: PracticeType) {
        ipcRenderer.send('add-practice', payload);
      },
      readAll(payload: PracticeType) {
        ipcRenderer.send('get-practices', payload);
      },
      rank(payload: RankingPayload) {
        ipcRenderer.send('get-rank', payload);
      },
    },
  },
});
