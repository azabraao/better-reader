import clsx from 'clsx';
import { memo } from 'react';

interface PerformanceBadgeProps {
  pts: number;
  wpm: number;
  target: number;
}

const poorPerformance = (target: number, wpm: number) => {
  return wpm < target * 0.8;
};

const badPerformance = (target: number, wpm: number) => {
  return wpm >= target * 0.8 && wpm < target;
};

const goodPerformance = (target: number, wpm: number) => {
  return wpm >= target && wpm < target * 1.2;
};

const greatPerformance = (target: number, wpm: number) => {
  return wpm >= target * 1.2;
};

const PerformanceBadge = ({ pts, wpm, target }: PerformanceBadgeProps) => {
  return (
    <div
      className={clsx(
        'flex items-center text-xs text-black rounded-md border border-black',
        {
          'bg-danger-300': poorPerformance(target, wpm),
          'bg-warning-300': badPerformance(target, wpm),
          'bg-success-300': goodPerformance(target, wpm),
          'bg-success-500': greatPerformance(target, wpm),
        }
      )}
    >
      <div className="flex items-center justify-center px-2 py-1 ">
        {pts}pts
      </div>
      <span className="bg-black h-6 w-[1px]" />
      <div className="flex items-center justify-center px-2 py-1 ">
        {wpm}ppm
      </div>
    </div>
  );
};

export default memo(PerformanceBadge);
