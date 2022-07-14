import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import { api } from 'renderer/utils';

interface RankingContextValues {
  isLoadingRanking: boolean;
  rankingData: RankingItem[];
  showOnlyPodium: boolean;
  expandPodium: VoidFunction;
  minimizePodium: VoidFunction;
}

export const RankingContext = createContext({} as RankingContextValues);

interface ViewUserProps {
  children: React.ReactNode;
}

export const RankingProvider: React.FC<ViewUserProps> = ({ children }) => {
  const [isLoadingRanking, setIsLoadingRanking] = useState<boolean>(false);
  const [rankingData, setRankingData] = useState<RankingItem[]>([]);
  const [showOnlyPodium, setShowOnlyPodium] = useState<boolean>(false);

  const fetchRankingData = useCallback(async () => {
    try {
      setIsLoadingRanking(true);

      const { data } = await api.get('/ranking');
      setRankingData(data);
    } catch (err) {
      toast.error("Couldn't load ranking");
    } finally {
      setIsLoadingRanking(false);
    }
  }, []);

  const expandPodium = useCallback(() => setShowOnlyPodium(false), []);
  const minimizePodium = useCallback(() => setShowOnlyPodium(true), []);

  useEffect(() => {
    fetchRankingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RankingContext.Provider
      value={{
        isLoadingRanking,
        rankingData,
        showOnlyPodium,
        expandPodium,
        minimizePodium,
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
