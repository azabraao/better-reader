import clsx from 'clsx';
import { memo, useCallback } from 'react';
import Icon from 'renderer/atoms/Icon';

interface TrainingUnitProps extends TrainingUnit {
  isActive?: boolean;
}

const TrainingUnit = ({
  target,
  duration,
  techniques,
  isActive,
}: TrainingUnitProps) => {
  const onClick = useCallback(() => {}, []);

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex flex-wrap gap-y-2 md:gap-y-4 gap-x-5 p-2 md:p-4 border-2 border-solid rounded-lg cursor-pointer w-full',
        isActive ? 'border-white text-white' : 'border-muted text-muted'
      )}
    >
      <div className="flex gap-2 items-center">
        <Icon name="speed" />
        <span className="text-base">{target}ppm</span>
      </div>
      <div className="flex gap-2 items-center">
        <Icon name="clock" />
        <span className="text-base">{duration}min</span>
      </div>
      {techniques.map((technique) => (
        <div
          key={technique.value + Math.random()}
          className="flex gap-2 items-center"
        >
          <Icon name={technique.value} />
          <span className="text-base">{technique.label}</span>
        </div>
      ))}
    </button>
  );
};

TrainingUnit.defaultProps = {
  isActive: false,
};

export default memo(TrainingUnit);
