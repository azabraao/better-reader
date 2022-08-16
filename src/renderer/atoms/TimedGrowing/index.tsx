import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';

interface TimedGrowingProps {
  start: boolean;
  duration: number;
}

const TimedGrowing = ({ start, duration }: TimedGrowingProps) => {
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    if (start) {
      setTimeout(() => {
        setIsFinished(true);
      }, duration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  return (
    <div
      className={clsx(
        'absolute top-0 right-0 bottom-0 left-0 bg-danger-transparent transition-all ease-linear w-full max-w-[0%]',
        {
          'opacity-0': isFinished,
        }
      )}
      style={{
        transitionDuration: isFinished ? '300ms' : `${duration}ms`,
        ...{ ...(start && { maxWidth: '100%' }) },
      }}
    />
  );
};

export default memo(TimedGrowing);
