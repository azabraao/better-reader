import { memo } from 'react';
import Skeleton from 'react-loading-skeleton';

interface RankingLoadingProps {
  count: number;
}

const RankingLoading = ({ count }: RankingLoadingProps) => {
  return (
    <>
      <Skeleton
        className="mb-2"
        height={62}
        width="100%"
        borderRadius={8}
        count={count}
      />
    </>
  );
};

export default memo(RankingLoading);
