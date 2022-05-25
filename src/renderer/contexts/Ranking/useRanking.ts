import { useContext } from 'react';
import { RankingContext } from './index';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useRanking: any = () => {
  const context = useContext(RankingContext);
  if (!context)
    throw new Error('useRanking must be used within a RankingProvider');

  return context;
};

export default useRanking;
