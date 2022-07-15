import { memo } from 'react';

interface RankingContainerProps {
  children: React.ReactNode;
}

const RankingContainer = ({ children }: RankingContainerProps) => (
  <div className="pt-4">{children}</div>
);

export default memo(RankingContainer);
