import { useContext } from 'react';
import { PortalContext } from './index';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const usePortal: any = () => {
  const context = useContext(PortalContext);
  if (!context)
    throw new Error('usePortal must be used within a PortalProvider');

  return context;
};

export default usePortal;
