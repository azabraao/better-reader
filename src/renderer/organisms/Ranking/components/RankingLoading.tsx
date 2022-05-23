import { memo, ReactNode } from 'react';
import Skeleton from 'react-loading-skeleton';

const RankingLoading: React.FC<ReactNode> = () => {
  return (
    <>
      <Skeleton
        className="mb-2"
        height={62}
        width="100%"
        borderRadius={8}
        count={3}
      />
    </>
  );
};

export default memo(RankingLoading);
