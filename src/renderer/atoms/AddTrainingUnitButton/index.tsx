import { memo } from 'react';
import { PlusClean } from 'renderer/atoms/Icon';

interface AddTrainingUnitButtonProps {
  onClick: () => void;
}

const AddTrainingUnitButton = ({ onClick }: AddTrainingUnitButtonProps) => {
  return (
    <div className="pt-4 pb-1">
      <button
        onClick={onClick}
        type="button"
        className="flex justify-center items-center text-sm gap-2 w-full pb-2 pt-2"
      >
        <PlusClean /> <span>Add training unit</span>
      </button>
    </div>
  );
};

export default memo(AddTrainingUnitButton);
