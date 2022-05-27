import React, {
  createContext,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import { api } from 'renderer/utils';

interface RankingContextValues {
  isLoadingRanking: boolean;
  rankingData: RankingItem[];
}

export const RankingContext = createContext({} as RankingContextValues);

interface ViewUserProps {
  children: React.ReactNode;
}

type RankingItem = {
  points: number;
  words: number;
  ppm: number;
  date: Date;
  comprehension: number;
  techniques: string[];
};

export const RankingProvider: React.FC<ViewUserProps> = ({ children }) => {
  const [isLoadingRanking, setIsLoadingRanking] = useState(false);
  const [rankingData, setRankingData] = useState([] as RankingItem[]);

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

  useEffect(() => {
    fetchRankingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RankingContext.Provider
      value={{
        isLoadingRanking,
        rankingData,
      }}
    >
      {children}
    </RankingContext.Provider>
  );
};

export default memo(RankingProvider);
