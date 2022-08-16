import clsx from 'clsx';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { TimedGrowing } from 'renderer/atoms';
import Icon from 'renderer/atoms/Icon';
import { useTrainingSessionCard } from '../TrainingSessionCard/Context';

interface TrainingUnitProps extends TrainingUnit {
  index: number;
}

const TrainingUnit = ({
  target,
  duration,
  techniques,
  index,
}: TrainingUnitProps) => {
  const {
    session,
    trainingStarted,
    activeTrainingIndex,
    setIsWaiting,
    setActiveTrainingIndex,
  } = useTrainingSessionCard();

  const durationInMilliseconds = duration * 60 * 1000;
  const isActive = trainingStarted && activeTrainingIndex === index;

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        if (activeTrainingIndex < session.units.length - 1) {
          setActiveTrainingIndex(activeTrainingIndex + 1);
        }
        setTimeout(() => {
          console.log('isWaiting?');
          setIsWaiting(false);
        }, 3000);
      }, durationInMilliseconds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  const onClick = useCallback(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      role="button"
      onClick={onClick}
      onKeyPress={onClick}
      tabIndex={0}
      className={clsx(
        'flex flex-wrap gap-y-2 md:gap-y-4 gap-x-5 p-2 md:p-4 border-2 border-solid rounded-lg cursor-pointer w-full relative overflow-hidden'
      )}
    >
      <TimedGrowing start={isActive} duration={durationInMilliseconds} />
      <div className="flex gap-2 items-center">
        <Icon name="speed" />
        <span className="text-base">{target}ppm</span>
      </div>
      <div className="flex gap-2 items-center">
        <Icon name="clock" />
        <span className="text-base">{duration}min</span>
      </div>
      {techniques.map((technique) => (
        <div key={Math.random()} className="flex gap-2 items-center">
          <Icon name={technique.value} />
          <span className="text-base">{technique.label}</span>
        </div>
      ))}
    </div>
  );
};

export default memo(TrainingUnit);
