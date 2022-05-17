import { memo, ReactNode } from 'react';
import ArrowIcon from 'renderer/assets/arrow-down.svg';

const Dropdown: React.FC<ReactNode> = () => {
  return (
    <div className="relative">
      <div className="flex justify-between">
        <div>Sweeping</div>
        <ArrowIcon />
      </div>
      {/* <div className="absolute"></div> */}
    </div>
  );
};

export default memo(Dropdown);
