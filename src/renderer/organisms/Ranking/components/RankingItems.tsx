/* eslint-disable react/no-array-index-key */
import { memo, useEffect } from 'react';
import { useLayoutSwitch, useRanking } from 'renderer/contexts';
import RankingItem from './RankingItem';
import RankingLoading from './RankingLoading';

interface RankingItemsProps {
  items: PracticeItem[];
}

const RankingItems = ({ items }: RankingItemsProps) => {
  const { setIsRankingFocused } = useLayoutSwitch();
  const { isLoadingRanking } = useRanking();

  useEffect(() => {
    setIsRankingFocused(items.length > 3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  if (items.length === 0) {
    return <p className="text-white">No items to show</p>;
  }

  return (
    <>
      {items.map((item, index) => (
        <RankingItem
          key={index + Math.random()}
          position={index + 1}
          points={item.points}
          words={item.words}
          ppm={item.ppm}
          date={item.createdAt}
          comprehension={item.comprehension}
        />
      ))}
      {isLoadingRanking && <RankingLoading count={10} />}
    </>
  );
};

export default memo(RankingItems);
