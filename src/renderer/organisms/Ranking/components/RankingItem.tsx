import { memo } from 'react';
import clsx from 'clsx';

interface RankingItemProps {
  position: number;
  points: number;
  words?: number;
  ppm: number;
  date: Date;
  comprehension: number;
}

const RankingItem = ({
  position,
  points,
  words,
  ppm,
  date,
  comprehension,
}: RankingItemProps) => {
  const isOnPodium = position <= 3;
  return (
    <div className="flex gap-x-6 rounded-lg border-muted border-1 mb-2 items-stretch p-2">
      <div className="flex items-center">
        <span
          className={clsx(
            'font-medium mr-6 w-5',
            isOnPodium ? 'text-white' : 'text-muted'
          )}
        >
          {position}
          {isOnPodium && '#'}
        </span>
      </div>
      <div className="flex flex-col mr-6">
        <span
          className={clsx(
            'font-medium mb-1',
            isOnPodium ? 'text-white' : 'text-muted'
          )}
        >
          {points}pts
        </span>
        <span className="text-muted font-medium text-xs whitespace-nowrap">
          {words} words
        </span>
      </div>
      <div className="flex flex-col">
        <span
          className={clsx(
            'font-medium mb-1',
            isOnPodium ? 'text-white' : 'text-muted'
          )}
        >
          {ppm}ppm
        </span>
        <span className="text-muted font-medium text-xs whitespace-nowrap">
          %{comprehension} comprehension
        </span>
      </div>
      <div className="flex flex-col justify-end w-full">
        <span className="text-muted font-medium text-xs text-right">
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>
    </div>
  );
};

RankingItem.defaultProps = {
  words: 0,
};

export default memo(RankingItem);
