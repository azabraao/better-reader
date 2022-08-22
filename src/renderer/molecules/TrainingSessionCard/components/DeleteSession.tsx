import { memo, useState } from 'react';
import { Trash } from 'renderer/atoms/Icon';
import DeleteBottomSheet from './DeleteBottomSheet';

const DeleteSession = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const onClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    setModalIsOpen(true);
  };

  return (
    <>
      <DeleteBottomSheet
        isOpen={modalIsOpen}
        close={() => setModalIsOpen(false)}
      />
      <div
        className="flex gap-2 pb-4 pt-2 px-4 text-white text-base"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={onClick}
      >
        <Trash />
        <span>Delete Training Session</span>
      </div>
    </>
  );
};

export default memo(DeleteSession);
