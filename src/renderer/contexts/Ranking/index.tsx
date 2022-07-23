import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import { api } from 'renderer/services';

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
  const [isLoadingRanking, setIsLoadingRanking] = useState<boolean>(false);
  const [rankingData, setRankingData] = useState<PracticeItem[]>([]);
  const [showOnlyPodium, setShowOnlyPodium] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [reachedRankingEnd, setReachedRankingEnd] = useState<boolean>(false);

  const fetchRankingData = useCallback(async () => {
    try {
      setIsLoadingRanking(true);

      const start = page * 10;
      const { data, headers } = await api.get(
        `/ranking?_sort=points&_order=desc&_limit=10&page=${page}&_start=${start}`
      );
      setRankingData([...rankingData, ...data]);
      setReachedRankingEnd(
        parseInt(headers['x-total-count'], 10) <= rankingData.length + 10
      );
    } catch (err) {
      toast.error("Couldn't load ranking");
    } finally {
      setIsLoadingRanking(false);
    }
  }, [page, rankingData]);

  const loadMoreRankingData = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const expandPodium = useCallback(() => setShowOnlyPodium(false), []);
  const minimizePodium = useCallback(() => setShowOnlyPodium(true), []);

  useEffect(() => {
    fetchRankingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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
