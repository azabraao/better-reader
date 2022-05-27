import { memo, ReactNode } from 'react';
import Skeleton from 'react-loading-skeleton';

const LoadingState: React.FC<ReactNode> = () => {
  return (
    <>
      <div className="pl-4 mt-7">
        <Skeleton width="100%" height={300} />
      </div>

      <div className="mt-8 pl-8 ">
        <div className="flex flex-row mb-1 gap-2">
          <Skeleton width={16} height={16} borderRadius={0} />
          <Skeleton width={54} height={16} />
        </div>
        <div className="flex flex-row mb-1 gap-2">
          <Skeleton width={16} height={16} borderRadius={0} />
          <Skeleton width={127} height={16} />
        </div>
        <div className="flex flex-row mb-1 gap-2">
          <Skeleton width={16} height={16} borderRadius={0} />
          <Skeleton width={136} height={16} />
        </div>
      </div>
    </>
  );
};

export default memo(LoadingState);
