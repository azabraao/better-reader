import { memo, ReactNode } from 'react';
import LogoIcon from 'renderer/assets/logo-icon.svg';

const Logo: React.FC<ReactNode> = () => {
  return (
    <div className="flex items-center">
      <LogoIcon className="mr-2" />
      <span className="text-white text-lg lg:text-2xl">Better Reader</span>
    </div>
  );
};

export default memo(Logo);
