import { memo, useState } from 'react';
import { Trash } from 'renderer/atoms/Icon';
import { ifSpaceBar } from 'renderer/utils';
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
        tabIndex={modalIsOpen ? 0 : 1}
        onKeyDown={(e) => ifSpaceBar(e, onClick)}
      >
        <Trash />
        <span>Deletar sessão de treino</span>
      </div>
    </>
  );
};

export default memo(DeleteSession);
