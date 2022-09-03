/* eslint-disable no-nested-ternary */

import { useEffect, useState } from 'react';
import { useAudioFeedback, useInterval } from 'renderer/hooks';
import { useTrainingSessionCard } from 'renderer/molecules/TrainingSessionCard/Context';
import { twoDigits } from 'renderer/utils';
import CountdownButton from '../CountdownButton';

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
    <CountdownButton active={isStarted} onClick={handleStart}>
      {isStarted || isOnPreCountdown ? (
        <span>
          {twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}
        </span>
      ) : (
        'Começar agora'
      )}
    </CountdownButton>
  );
};

Countdown.defaultProps = {
  onStart: () => {},
};

export default Countdown;
