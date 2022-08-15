/* eslint-disable no-nested-ternary */

import clsx from 'clsx';
import { useState } from 'react';
import { useInterval } from 'renderer/hooks';
import { twoDigits } from 'renderer/utils';
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
  const [secondsRemaining, setSecondsRemaining] = useState(
    minutesToSeconds(minutes)
  );
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;

  const handleStart = () => {
    onStart();
    setIsStarted(true);
  };

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
      onKeyDown={handleStart}
      tabIndex={0}
      role="button"
      className={clsx('flex justify-center py-6')}
    >
      <div className="flex gap-2 items-center">
        <Icon name="play" />
        {isStarted ? (
          <span>
            {twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}
          </span>
        ) : (
          'Start now'
        )}
      </div>
    </div>
  );
};

Countdown.defaultProps = {
  onStart: () => {},
};

export default Countdown;
