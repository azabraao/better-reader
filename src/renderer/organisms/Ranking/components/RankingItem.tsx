import { memo } from 'react';
import clsx from 'clsx';

interface RankingItemProps {
  position: number;
  date: Date;
  words?: number;
  points: number;
  ppm: number;
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
    <div className="flex gap-x-6 gap-y-2 rounded-lg border-muted border-1 mb-2 items-stretch p-2 flex-wrap">
      <div className="flex items-center">
        <span
          className={clsx(
            'font-medium w-5',
            isOnPodium ? 'text-white' : 'text-muted'
          )}
        >
          {position}
          {isOnPodium && '#'}
        </span>
      </div>
      <div className="flex flex-col">
        <span
          className={clsx(
            'font-medium mb-1',
            isOnPodium ? 'text-white' : 'text-muted'
          )}
        >
          {points}pts
        </span>
        <span className="text-muted font-medium text-xs whitespace-nowrap">
          {words} palavras
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
          %{comprehension} compreensão
        </span>
      </div>
      <div className="flex flex-col items-start xs:items-end justify-end flex-grow">
        <span className="text-muted font-medium text-xs text-right">
          {new Date(date).toLocaleDateString('pt-BR', {
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
