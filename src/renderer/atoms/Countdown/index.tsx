/* eslint-disable no-nested-ternary */

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useAudioFeedback, useInterval } from 'renderer/hooks';
import { useTrainingSessionCard } from 'renderer/molecules/TrainingSessionCard/Context';
import { ifSpaceBar, twoDigits } from 'renderer/utils';
import Icon from '../Icon';

const minutesToSeconds = (minutes: number) => minutes * 60;

interface CountdownProps {
  minutes: number;
  onFinish: () => void;
  onStart?: () => void;
}

const Countdown = ({
  minutes,
  onFinish,
  onStart = () => {},
}: CountdownProps) => {
  const [secondsRemaining, setSecondsRemaining] = useState(3);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const { isOnPreCountdown, setIsOnPreCountdown } = useTrainingSessionCard();
  const { countdownTick, lessonBell } = useAudioFeedback();
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;

  useEffect(() => {
    // TODO: remove this hack
    if (isOnPreCountdown) {
      countdownTick.play();
      setTimeout(() => {
        countdownTick.play();
        setTimeout(() => {
          countdownTick.play();
          setTimeout(() => {
            lessonBell.play();
          }, 1000);
        }, 1000);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnPreCountdown]);

  const handleStart = () => {
    setIsOnPreCountdown(true);
  };

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        setSecondsRemaining(minutesToSeconds(minutes));
        setIsStarted(true);
        onStart();
        setIsOnPreCountdown(false);
      }
    },
    isOnPreCountdown ? 1000 : null
  );

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        onFinish();
      }
    },
    isStarted ? 1000 : null
  );

  return (
    <div
      onClick={handleStart}
      onKeyDown={(e) => ifSpaceBar(e, handleStart)}
      tabIndex={0}
      role="button"
      className={clsx(
        'flex justify-center py-6',
        isStarted && 'pointer-events-none cursor-not-allowed'
      )}
    >
      <div className="flex gap-2 items-center">
        <Icon name="play" />
        {isStarted || isOnPreCountdown ? (
          <span>
            {twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}
          </span>
        ) : (
          'Começar agora'
        )}
      </div>
    </div>
  );
};

Countdown.defaultProps = {
  onStart: () => {},
};

export default Countdown;
