import { memo, ReactNode } from 'react';
import clsx from 'clsx';
import { useLayoutSwitch } from 'renderer/contexts';

interface DashboardLayoutProps {
  ranking: ReactNode;
  evolution: ReactNode;
  practices: ReactNode;
}

const DashboardLayout = ({
  ranking,
  evolution,
  practices,
}: DashboardLayoutProps) => {
  const { isRankingFocused } = useLayoutSwitch();

  return (
    <div
      className={clsx(
        'flex gap-4 flex-col lg:grid lg:gap-x-20 lg:grid-cols-2',
        isRankingFocused && 'grid-auto-fit'
      )}
    >
      <div className={clsx(isRankingFocused && 'lg:row-span-2')}>{ranking}</div>
      {evolution}
      <div className={clsx(!isRankingFocused && 'lg:col-span-2')}>
        {practices}
      </div>
    </div>
  );
};

export default memo(DashboardLayout);
