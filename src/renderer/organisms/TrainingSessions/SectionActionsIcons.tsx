import { memo } from 'react';
import { Plus } from 'renderer/atoms/Icon';
import { useAddTrainingSession } from 'renderer/hooks';

const SectionActionsIcons = () => {
  const { openAddTrainingSession } = useAddTrainingSession();

  return <Plus onClick={openAddTrainingSession} />;
};

export default memo(SectionActionsIcons);
