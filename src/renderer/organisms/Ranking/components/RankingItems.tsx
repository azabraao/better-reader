/* eslint-disable react/no-array-index-key */
import { memo } from 'react';
import RankingItem from './RankingItem';

interface RankingItemsProps {
  items: any[];
}

const RankingItems = ({ items }: RankingItemsProps) => {
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
