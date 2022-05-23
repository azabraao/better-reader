import clsx from 'clsx';
import React, { createContext, memo, useState } from 'react';

interface PortalContextValues {
  portalIsOpen: boolean;
  openPortal: () => void;
  closePortal: () => void;
  setOnPortalClick: (callback: () => void) => void;
}

export const PortalContext = createContext({} as PortalContextValues);

interface ViewUserProps {
  children: React.ReactNode;
}

export const PortalProvider: React.FC<ViewUserProps> = ({ children }) => {
  const [portalIsOpen, setPortalIsOpen] = useState(false);
  const [onPortalClick, setOnPortalClick] = useState(() => {});
  const openPortal = () => setPortalIsOpen(true);
  const closePortal = () => setPortalIsOpen(false);

  const handlePortalClick = () => {
    debugger;
    onPortalClick();
  };

  return (
    <PortalContext.Provider
      value={{
        portalIsOpen,
        setOnPortalClick,
        openPortal,
        closePortal,
      }}
    >
      <div
        className={clsx(
          'absolute w-full h-full z-0 pointer-events-none',
          portalIsOpen &&
            'opacity-100 bg-black bg-opacity-75 pointer-events-auto'
        )}
        onClick={handlePortalClick}
        onKeyDown={handlePortalClick}
        role="presentation"
      />
      {children}
    </PortalContext.Provider>
  );
};

export default memo(PortalProvider);
