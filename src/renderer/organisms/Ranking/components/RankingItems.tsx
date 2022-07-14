/* eslint-disable react/no-array-index-key */
import { memo, useEffect } from 'react';
import { useLayoutSwitch } from 'renderer/contexts';
import RankingItem from './RankingItem';

interface RankingItemsProps {
  items: any[];
}

const RankingItems = ({ items }: RankingItemsProps) => {
  const { setIsRankingFocused } = useLayoutSwitch();

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
          key={index}
          position={index + 1}
          points={item.points}
          words={item.words}
          ppm={item.ppm}
          date={item.date}
          comprehension={item.comprehension}
        />
      ))}
    </>
  );
};

export default memo(RankingItems);
