import { memo } from 'react';

interface RankingContainerProps {
  children: ReactNode;
}

const RankingContainer = ({ children }: RankingContainerProps) => (
  <div className="pt-4">{children}</div>
);

export default memo(RankingContainer);
