import { memo, useState } from 'react';
import { Plus } from 'renderer/atoms/Icon';
import AddTrainingSession from '../AddTrainingSession';

const SectionActionsIcons = () => {
  const [isAddingTrainingSession, setIsAddingTrainingSession] =
    useState<boolean>(false);

  return (
    <>
      <AddTrainingSession
        isOpen={isAddingTrainingSession}
        close={() => setIsAddingTrainingSession(false)}
      />
      <Plus onClick={() => setIsAddingTrainingSession(true)} />
    </>
  );
};

export default memo(SectionActionsIcons);
