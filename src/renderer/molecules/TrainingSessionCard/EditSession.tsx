import { memo } from 'react';
import { Edit } from 'renderer/atoms/Icon';

const EditSession = () => {
  return (
    <div className="flex gap-2 pb-2 pt-4 px-4 text-white text-base">
      <Edit />
      <span>Edit Training Session</span>
    </div>
  );
};

export default memo(EditSession);
