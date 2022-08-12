import { memo } from 'react';
import { CheckedSM as CheckedIcon } from '../Icon';

const Checked = () => {
  return (
    <div
      className="flex text-success rounded-full justify-center items-center border-white border-2 border-solid"
      style={{ width: 80, height: 80 }}
    >
      <CheckedIcon />
    </div>
  );
};

export default memo(Checked);
