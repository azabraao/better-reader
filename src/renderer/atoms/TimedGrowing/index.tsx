import { memo } from 'react';

interface TimedGrowingProps {
  start: boolean;
  duration: number;
}

const TimedGrowing = ({ start, duration }: TimedGrowingProps) => {
  return (
    <div
      className="absolute top-0 right-0 bottom-0 left-0 bg-danger-transparent transition-all w-full max-w-[0%]"
      style={{
        transitionDuration: `${duration}ms`,
        ...{ ...(start && { maxWidth: '100%' }) },
      }}
    />
  );
};

export default memo(TimedGrowing);
