import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';
import { PerformanceBadge, TimedGrowing } from 'renderer/atoms';
import Icon from 'renderer/atoms/Icon';
import { useAudioFeedback } from 'renderer/hooks';
import { millisecondsToMinutes, techniquesToItems } from 'renderer/utils';
import { useTrainingSessionCard } from '../TrainingSessionCard/Context';
import Test from './Test';

interface TrainingUnitProps {
  index: number;
  techniques: Technique[];
  target: number;
  duration: number;
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
    setTrainingUnitIsFinished,
  } = useTrainingSessionCard();
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const isActive = trainingStarted && activeTrainingIndex === index;
  const { lessonBell } = useAudioFeedback();
  const [testResults, setTestResults] = useState<TestResults>(
    {} as TestResults
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isActive && !isOnPreCountdown) {
      timeout = setTimeout(() => {
        lessonBell.play();
        setIsTesting(true);
      }, duration);
    }

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, isOnPreCountdown]);

  const onLessonFinish = (results: TestResults) => {
    setTestResults(results);
    setIsFinished(true);
    setIsTesting(false);
    setIsWaiting(false);
    const shouldStartNextLesson =
      activeTrainingIndex < session.units.length - 1;

    if (shouldStartNextLesson) {
      setTrainingUnitIsFinished(true);
    } else {
      setActiveTrainingIndex(-1);
      setTrainingIsFinished(true);
    }
  };

  const techniquesItems = techniquesToItems(techniques);

  return (
    <div
      className={clsx(
        'border-2 border-solid rounded-lg relative',
        isFinished ? 'border-success-300 text-success-300' : 'overflow-hidden'
      )}
    >
      {isFinished && (
        <div className="absolute -right-2 -top-3 z-10">
          <PerformanceBadge
            pts={testResults.pts}
            wpm={testResults.wpm}
            target={target}
          />
        </div>
      )}
      <div className="flex flex-wrap gap-y-2 md:gap-y-4 gap-x-5 w-full relative p-2 md:p-4">
        <TimedGrowing
          start={isActive && !isOnPreCountdown}
          duration={duration}
        />
        <div className="flex gap-2 items-center">
          <Icon name="speed" />
          <span className="text-base">{target}ppm</span>
        </div>
        <div className="flex gap-2 items-center">
          <Icon name="clock" />
          <span className="text-base">
            {millisecondsToMinutes(duration)}min
          </span>
        </div>
        {techniquesItems.map((technique) => (
          <div key={Math.random()} className="flex gap-2 items-center">
            <Icon name={technique.value} />
            <span className="text-base">{technique.label}</span>
          </div>
        ))}
      </div>
      {isTesting && (
        <div className="p-2 md:p-4">
          <Test techniques={techniquesItems} onFinish={onLessonFinish} />
        </div>
      )}
    </div>
  );
};

export default memo(TrainingUnit);
