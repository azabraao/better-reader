import clsx from 'clsx';
import { memo, useCallback, useState } from 'react';
import { Backdrop } from 'renderer/atoms';
import { ThreeDots } from 'renderer/atoms/Icon';
import DeleteSession from './components/DeleteSession';
import EditSession from './components/EditSession';

const OptionsDown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onThreeDotsClick = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsOpen(true);
  }, []);

  const onBackdropClick = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsOpen(false);
  }, []);

  return (
    <>
      <Backdrop background={2} isOpen={isOpen} onClick={onBackdropClick} />
      <div
        className={clsx(
          'absolute -right-1/2 border bg-black border-white border-solid rounded-lg w-max z-20 transition-all duration-150',
          isOpen
            ? 'pointer-events-all opacity-1 bottom-3/4'
            : 'pointer-events-none opacity-0 bottom-2/4'
        )}
      >
        <EditSession />
        <DeleteSession />
      </div>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={onThreeDotsClick}
        onClick={onThreeDotsClick}
        data-role="action"
        className="opacity-0 pointer-events-none transition-opacity duration-150"
      >
        <ThreeDots className="absolute top-1 right-0 text-white" />
      </div>
    </>
  );
};

export default memo(OptionsDown);
