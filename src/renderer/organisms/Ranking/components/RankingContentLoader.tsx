import { memo, useCallback } from 'react';

import { ArrowTop, ArrowDown, ArrowRight } from 'renderer/atoms/Icon';
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
          className="flex flex-row items-center justify-center cursor-pointer text-muted"
          onClick={minimizePodium}
        >
          <span className="font-medium mr-2">Ver menos</span>
          <ArrowTop />
        </button>
        {!reachedRankingEnd && (
          <button
            type="button"
            className="flex flex-row items-center justify-center cursor-pointer text-muted"
            onClick={onLoadMoreClick}
          >
            <span className="font-medium mr-2">Carregar mais</span>
            <ArrowDown />
          </button>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      className="p-2 flex cursor-pointer text-muted"
      onClick={onLoadMoreClick}
    >
      <span className="mr-2">Ver mais</span>
      <ArrowRight />
    </button>
  );
};

export default memo(RankingContentLoader);
