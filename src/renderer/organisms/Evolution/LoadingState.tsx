import { memo, ReactNode } from 'react';
import Skeleton from 'react-loading-skeleton';

const LoadingState: React.FC<ReactNode> = () => {
  return (
    <>
      <Skeleton width="100%" height={200} />
      <div className="flex justify-between mt-1 flex-row px-4">
        <Skeleton width={40} height={20} />
        <Skeleton width={40} height={20} />
        <Skeleton width={40} height={20} />
        <Skeleton width={40} height={20} />
        <Skeleton width={40} height={20} />
        <Skeleton width={40} height={20} />
      </div>
      <div className="mt-5 pl-4">
        <div className="flex flex-row mb-1 gap-2">
          <Skeleton width={15} height={15} />
          <Skeleton width={100} height={15} />
        </div>
        <div className="flex flex-row mb-1 gap-2">
          <Skeleton width={15} height={15} />
          <Skeleton width={100} height={15} />
        </div>
        <div className="flex flex-row mb-1 gap-2">
          <Skeleton width={15} height={15} />
          <Skeleton width={100} height={15} />
        </div>
      </div>
    </>
  );
};

export default memo(LoadingState);
