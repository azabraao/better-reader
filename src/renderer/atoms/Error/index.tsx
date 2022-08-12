import { memo } from 'react';
import { CloseSM as XIcon } from '../Icon';

const Error = () => {
  return (
    <div
      className="flex text-danger rounded-full justify-center items-center border-white border-2 border-solid"
      style={{ width: 80, height: 80 }}
    >
      <XIcon />
    </div>
  );
};

export default memo(Error);
