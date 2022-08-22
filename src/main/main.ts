/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

const practice = require('../../db/stores/practice');
const trainingSession = require('../../db/stores/trainingSession');

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

ipcMain.on('window-action', async (_event, action: string) => {
  switch (action) {
    case 'minimize':
      mainWindow?.minimize();
      break;
    case 'maximize':
      mainWindow?.maximize();
      break;
    case 'unmaximize':
      mainWindow?.unmaximize();
      break;
    case 'close':
      mainWindow?.close();
      break;
    default:
      break;
  }
});

ipcMain.on('add-practice', async (_event, arg: PracticeType) => {
  try {
    const result = await practice.create(arg);
    _event.reply('add-practice', result);
  } catch (error) {
    _event.reply('add-practice', error);
  }
});

ipcMain.on('get-rank', async (_event, payload: RankingPayload) => {
  try {
    const all = await practice.rank(payload);
    _event.reply('get-rank', all);
  } catch (error) {
    console.log(error);
  }

  return practice.readAll();
});

ipcMain.on('get-practices', async (_event) => {
  try {
    const all = await practice.readAll();
    _event.reply('get-practices', all);
  } catch (error) {
    console.log(error);
  }

  return practice.readAll();
});

ipcMain.on(
  'create-training-session',
  async (_event, payload: TrainingSessionPayload) => {
    try {
      const all = await trainingSession.create(payload);
      _event.reply('create-training-session', all);
    } catch (error) {
      _event.reply('create-training-session', error);
    }
  }
);

ipcMain.on('delete-training-session', async (_event, id: string) => {
  try {
    const all = await trainingSession.create(id);
    _event.reply('delete-training-session', all);
  } catch (error) {
    _event.reply('delete-training-session', error);
  }
});

ipcMain.on('read-all-training-session', async (_event) => {
  try {
    const all = await trainingSession.readAll();
    _event.reply('read-all-training-session', all);
  } catch (error) {
    _event.reply('read-all-training-session', error);
  }
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    minWidth: 1200,
    minHeight: 850,
    width: 1200,
    height: 850,
    frame: false,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

/**
 * Add event listeners...
 */

ipcMain.handle('quit-app', () => {
  app.quit();
});

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
