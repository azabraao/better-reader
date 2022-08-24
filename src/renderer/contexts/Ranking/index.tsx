import { useQuery } from '@tanstack/react-query';
import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { getRanking } from 'renderer/services';

interface RankingContextValues {
  isLoadingRanking: boolean;
  rankingData: PracticeItem[];
  showOnlyPodium: boolean;
  reachedRankingEnd: boolean;
  rankingIsEmpty: boolean;
  expandPodium: VoidFunction;
  minimizePodium: VoidFunction;
  loadMoreRankingData: VoidFunction;
}

export const RankingContext = createContext({} as RankingContextValues);

interface ViewUserProps {
  children: React.ReactNode;
}

export const RankingProvider: React.FC<ViewUserProps> = ({ children }) => {
  const [showOnlyPodium, setShowOnlyPodium] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);

  const { isLoading: isLoadingRanking, data } = useQuery(
    ['getRanking', page],
    () => {
      return getRanking({ page, limit: 10 });
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const rankingData: PracticeItem[] = useMemo(() => {
    return data?.rank || [];
  }, [data?.rank]);

  const reachedRankingEnd = useMemo(() => {
    return data?.count === rankingData.length;
  }, [rankingData.length, data]);

  const loadMoreRankingData = useCallback(() => {
    if (!reachedRankingEnd) setPage(page + 1);
  }, [page, reachedRankingEnd]);

  const expandPodium = useCallback(() => setShowOnlyPodium(false), []);
  const minimizePodium = useCallback(() => setShowOnlyPodium(true), []);

  const rankingIsEmpty = useMemo(() => {
    return rankingData.length === 0;
  }, [rankingData]);

  return (
    <RankingContext.Provider
      value={{
        reachedRankingEnd,
        rankingIsEmpty,
        isLoadingRanking,
        rankingData,
        showOnlyPodium,
        expandPodium,
        minimizePodium,
        loadMoreRankingData,
      }}
    >
      {children}
    </RankingContext.Provider>
  );
};

export const useRanking = (): RankingContextValues => {
  const context = useContext(RankingContext);
  if (!context)
    throw new Error('useRanking must be used within a RankingProvider');

  return context;
};

export default memo(RankingProvider);
