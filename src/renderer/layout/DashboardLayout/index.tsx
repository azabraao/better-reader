import { memo, ReactNode } from 'react';
import clsx from 'clsx';
import useLayoutSwitch from 'renderer/contexts/LayoutSwitch/useLayoutSwitch';

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
    <div className="grid gap-4 lg:gap-x-20 lg:grid-cols-2">
      <div className={clsx(isRankingFocused && 'lg:row-span-2')}>{ranking}</div>
      {evolution}
      <div className={clsx(!isRankingFocused && 'lg:col-span-2')}>
        {practices}
      </div>
    </div>
  );
};

export default memo(DashboardLayout);
