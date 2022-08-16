import clsx from 'clsx';
import { memo, useCallback, useEffect, useState } from 'react';
import { TimedGrowing } from 'renderer/atoms';
import Icon from 'renderer/atoms/Icon';
import { useTrainingSessionCard } from '../TrainingSessionCard/Context';
import Test from './Test';

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
    setTrainingIsFinished,
    isOnPreCountdown,
    setIsOnPreCountdown,
  } = useTrainingSessionCard();
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const durationInMilliseconds = duration * 60 * 1000;
  const isActive = trainingStarted && activeTrainingIndex === index;

  useEffect(() => {
    if (isActive && !isOnPreCountdown) {
      setTimeout(() => {
        setIsTesting(true);
      }, durationInMilliseconds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, isOnPreCountdown]);

  const onLessonFinish = () => {
    setIsFinished(true);
    setIsTesting(false);
    setIsWaiting(false);
    const shouldStartNextLesson =
      activeTrainingIndex < session.units.length - 1;

    if (shouldStartNextLesson) {
      setIsOnPreCountdown(true);
      setActiveTrainingIndex(activeTrainingIndex + 1);
    } else {
      setTrainingIsFinished(true);
    }
  };

  return (
    <div
      className={clsx(
        'border-2 border-solid rounded-lg overflow-hidden',
        isFinished && 'border-success-300 text-success-300'
      )}
    >
      <div className="flex flex-wrap gap-y-2 md:gap-y-4 gap-x-5 w-full relative p-2 md:p-4">
        <TimedGrowing
          start={isActive && !isOnPreCountdown}
          duration={durationInMilliseconds}
        />
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
      {isTesting && (
        <div className="p-2 md:p-4">
          <Test techniques={techniques} onFinish={onLessonFinish} />
        </div>
      )}
    </div>
  );
};

export default memo(TrainingUnit);
