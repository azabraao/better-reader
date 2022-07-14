import { memo } from 'react';
import clsx from 'clsx';

interface BackdropProps {
  isOpen: boolean;
  onClick: () => void;
}

const Backdrop = ({ isOpen, onClick }: BackdropProps) => {
  return (
    <div
      className={clsx(
        'absolute top-0 right-0 bottom-0 left-0 z-10 pointer-events-none',
        isOpen && 'opacity-100 bg-black bg-opacity-75 pointer-events-auto'
      )}
      onClick={onClick}
      onKeyDown={onClick}
      role="presentation"
      data-testid="backdrop"
    />
  );
};

export default memo(Backdrop);
