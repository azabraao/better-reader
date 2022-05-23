import { memo, ReactNode } from 'react';

const RankingContainer = ({ children }: { children: ReactNode }) => (
  <div className="pt-4">{children}</div>
);

export default memo(RankingContainer);
