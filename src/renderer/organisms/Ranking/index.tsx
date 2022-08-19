import { memo } from 'react';
import { RankingProvider } from 'renderer/contexts';
import Component from './Component';

const Ranking = () => {
  return (
    <RankingProvider>
      <Component />
    </RankingProvider>
  );
};

export default memo(Ranking);
