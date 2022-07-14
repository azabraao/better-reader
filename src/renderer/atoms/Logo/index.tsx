import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoIcon from 'renderer/assets/logo-icon.svg';
import { ifSpaceBar } from 'renderer/utils';

const Logo = () => {
  const navigate = useNavigate();

  const onClick = () => navigate('/');

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => ifSpaceBar(e, onClick)}
      className="flex items-center w-max"
      role="button"
      tabIndex={0}
    >
      <LogoIcon className="mr-2" />
      <span className="text-white text-lg lg:text-2xl">Better Reader</span>
    </div>
  );
};

export default memo(Logo);
