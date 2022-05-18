import ReactDOM from 'react-dom';

import App from './App';
import '@fontsource/space-grotesk';

const container = document.getElementById('root');
ReactDOM.render(<App />, container);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
