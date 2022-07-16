import React, { useCallback, memo } from 'react';
import { FiX, FiMinus, FiMaximize2 } from 'react-icons/fi';

const WindowTitleBar: React.FC = () => {
  const handleCloseWindow = useCallback(() => {
    window.electron.ipcRenderer.sendMessage('window-action', 'close');
  }, []);

  const handleMaximize = useCallback(() => {
    window.electron.ipcRenderer.sendMessage('window-action', 'maximize');
  }, []);

  const handleMinimize = useCallback(() => {
    window.electron.ipcRenderer.sendMessage('window-action', 'minimize');
  }, []);

  return (
    <div className="bg-background w-full h-10 relative select-none drag flex items-center justify-center ">
      <div className="absolute top-0 h-full flex gap-2 items-center left-4">
        <button
          className="window-action w-3 h-3 rounded-md flex items-center justify-center cursor-pointer bg-[#E96379]"
          onClick={handleCloseWindow}
          tabIndex={-1}
          type="button"
        >
          <FiX />
        </button>
        <button
          className="window-action w-3 h-3 rounded-md cursor-pointer flex items-center justify-center bg-[#e7de79]"
          onClick={handleMinimize}
          tabIndex={-1}
          type="button"
        >
          <FiMinus />
        </button>
        <button
          className="window-action w-3 h-3 rounded-md cursor-pointer flex items-center justify-center bg-[#67e480]"
          onClick={handleMaximize}
          tabIndex={-1}
          type="button"
        >
          <FiMaximize2 />
        </button>
      </div>
    </div>
  );
};

export default memo(WindowTitleBar);
