import { memo } from 'react';
import { PlusClean } from 'renderer/atoms/Icon';

interface AddTrainingUnitButtonProps {
  onClick: () => void;
}

const AddTrainingUnitButton = ({ onClick }: AddTrainingUnitButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="flex justify-center items-center text-sm gap-2 w-full pt-6 pb-3"
    >
      <PlusClean /> <span>Add training unit</span>
    </button>
  );
};

export default memo(AddTrainingUnitButton);
