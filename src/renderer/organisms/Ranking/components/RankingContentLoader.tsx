import { memo } from 'react';

import ArrowRight from 'renderer/assets/icons/muted/arrow-right.svg';
import ArrowTop from 'renderer/assets/icons/muted/arrow-top.svg';
import ArrowDown from 'renderer/assets/icons/muted/arrow-down.svg';
import useLayoutSwitch from 'renderer/contexts/LayoutSwitch/useLayoutSwitch';
import useRanking from 'renderer/contexts/Ranking/useRanking';

const RankingContentLoader = () => {
  const { isRankingFocused } = useLayoutSwitch();
  const { minimizePodium, expandPodium } = useRanking();

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
        <div className="flex flex-row items-center justify-center cursor-pointer">
          <span className="text-muted font-medium mr-2">Load more</span>
          <ArrowDown />
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="p-2 flex cursor-pointer"
      onClick={expandPodium}
    >
      <span className="text-muted mr-2">See All</span>
      <ArrowRight />
    </button>
  );
};

export default memo(RankingContentLoader);
