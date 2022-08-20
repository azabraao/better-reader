import { Channels, WindowAction } from 'main/preload';

type WindowActionsArgs = 'unmaximize' | 'maximize' | 'close' | 'minimize';
declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(
          channel: Channels | WindowAction,
          args: unknown[] | WindowActionsArgs
        ): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args) => void): void;
      };
      api: {
        practices: {
          create(payload: PracticePayload): void;
          readAll(): void;
          rank(payload: RankingPayload): void;
        };
        trainingSession: {
          readAll(): void;
          create(payload: TrainingSessionPayload): void;
        };
      };
    };
  }
}

export {};
