import { memo } from 'react';
import Skeleton from 'react-loading-skeleton';

const LoadingState = () => {
  return (
    <>
      <Skeleton
        height={75}
        borderRadius={8}
        className="w-full xs:max-w-[calc(50vw-27px)]"
        containerClassName="w-full xs:max-w-[calc(50vw-27px)]"
      />
      <Skeleton
        height={75}
        borderRadius={8}
        className="w-full xs:max-w-[calc(50vw-27px)]"
        containerClassName="w-full xs:max-w-[calc(50vw-27px)]"
      />
      <Skeleton
        height={75}
        borderRadius={8}
        className="w-full xs:max-w-[calc(50vw-27px)]"
        containerClassName="w-full xs:max-w-[calc(50vw-27px)]"
      />
      <Skeleton
        height={75}
        borderRadius={8}
        className="w-full xs:max-w-[calc(50vw-27px)]"
        containerClassName="w-full xs:max-w-[calc(50vw-27px)]"
      />
    </>
  );
};

export default memo(LoadingState);
