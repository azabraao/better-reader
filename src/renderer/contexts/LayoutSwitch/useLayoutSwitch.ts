import { useContext } from 'react';
import { LayoutSwitchContext } from './index';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useLayoutSwitch: any = () => {
  const context = useContext(LayoutSwitchContext);
  if (!context)
    throw new Error(
      'useLayoutSwitch must be used within a LayoutSwitchProvider'
    );

  return context;
};

export default useLayoutSwitch;
