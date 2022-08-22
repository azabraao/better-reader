import { memo, MouseEventHandler } from 'react';
import clsx from 'clsx';
import { PutItUnderBody } from 'renderer/layout';

interface BackdropProps {
  isOpen: boolean;
  onClick: MouseEventHandler;
  background?: 1 | 2;
}

const Backdrop = ({ isOpen, onClick, background }: BackdropProps) => {
  return (
    <PutItUnderBody>
      <div
        className={clsx(
          'absolute top-0 right-0 bottom-0 left-0 z-10 pointer-events-none',
          isOpen && 'opacity-100 pointer-events-auto',
          isOpen && background === 1 && 'bg-black bg-opacity-75',
          isOpen && background === 2 && 'bg-black bg-opacity-50'
        )}
        onClick={onClick}
        role="presentation"
        data-testid="backdrop"
      />
    </PutItUnderBody>
  );
};

Backdrop.defaultProps = {
  background: 1,
};

export default memo(Backdrop);
