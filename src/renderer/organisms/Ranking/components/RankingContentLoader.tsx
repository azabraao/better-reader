import { memo, useCallback } from 'react';

import ArrowRight from 'renderer/assets/icons/muted/arrow-right.svg';
import ArrowTop from 'renderer/assets/icons/muted/arrow-top.svg';
import ArrowDown from 'renderer/assets/icons/muted/arrow-down.svg';
import { useRanking, useLayoutSwitch } from 'renderer/contexts';

const RankingContentLoader = () => {
  const { isRankingFocused } = useLayoutSwitch();
  const {
    minimizePodium,
    expandPodium,
    loadMoreRankingData,
    reachedRankingEnd,
  } = useRanking();

  const onLoadMoreClick = useCallback(() => {
    expandPodium();
    loadMoreRankingData();
  }, [expandPodium, loadMoreRankingData]);

  if (isRankingFocused) {
    return (
      <div className="flex justify-between p-2">
        <button
          type="button"
          className="flex flex-row items-center justify-center cursor-pointer"
          onClick={minimizePodium}
        >
          <span className="text-muted font-medium mr-2">See less</span>
          <ArrowTop />
        </button>
        {!reachedRankingEnd && (
          <button
            type="button"
            className="flex flex-row items-center justify-center cursor-pointer"
            onClick={onLoadMoreClick}
          >
            <span className="text-muted font-medium mr-2">Load more</span>
            <ArrowDown />
          </button>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      className="p-2 flex cursor-pointer"
      onClick={onLoadMoreClick}
    >
      <span className="text-muted mr-2">See more</span>
      <ArrowRight />
    </button>
  );
};

export default memo(RankingContentLoader);
