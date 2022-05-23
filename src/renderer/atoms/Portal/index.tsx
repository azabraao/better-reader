import { memo } from 'react';
import clsx from 'clsx';

interface PortalProps {
  isOpen: boolean;
  onClick: () => void;
}

const Portal = ({ isOpen, onClick }: PortalProps) => {
  return (
    <div
      className={clsx(
        'absolute top-0 right-0 bottom-0 left-0 z-0 pointer-events-none',
        isOpen && 'opacity-100 bg-black bg-opacity-75 pointer-events-auto'
      )}
      onClick={onClick}
      onKeyDown={onClick}
      role="presentation"
    />
  );
};

export default memo(Portal);
