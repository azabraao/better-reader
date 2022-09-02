import clsx from 'clsx';
import { memo } from 'react';
import Icon from 'renderer/atoms/Icon';
import { ifSpaceBar } from 'renderer/utils';

interface CountdownButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  active: boolean;
}

const CountdownButton = ({
  onClick,
  children,
  active,
}: CountdownButtonProps) => {
  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => ifSpaceBar(e, onClick)}
      tabIndex={0}
      role="button"
      className={clsx(
        'flex justify-center py-6',
        active && 'pointer-events-none cursor-not-allowed'
      )}
    >
      <div className="flex gap-2 items-center">
        <Icon name="play" />
        {children}
      </div>
    </div>
  );
};

export default memo(CountdownButton);
