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

interface PracticesContextValues {
  isLoadingPractices: boolean;
  practicesData: PracticeItem[];
  showOnlyPodium: boolean;
  reachedPracticesEnd: boolean;
  practicesIsEmpty: boolean;
  expandPodium: VoidFunction;
  minimizePodium: VoidFunction;
  loadMorePracticesData: VoidFunction;
}

export const PracticesContext = createContext({} as PracticesContextValues);

interface ViewUserProps {
  children: React.ReactNode;
}

export const PracticesProvider: React.FC<ViewUserProps> = ({ children }) => {
  const [isLoadingPractices, setIsLoadingPractices] = useState<boolean>(false);
  const [practicesData, setPracticesData] = useState<PracticeItem[]>([]);
  const [showOnlyPodium, setShowOnlyPodium] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [reachedPracticesEnd, setReachedPracticesEnd] =
    useState<boolean>(false);

  const fetchPracticesData = useCallback(async () => {
    try {
      setIsLoadingPractices(true);

      const start = page * 10;
      const { data, headers } = await api.get(
        `/practices?_sort=points&_order=desc&_limit=10&page=${page}&_start=${start}`
      );
      setPracticesData([...practicesData, ...data]);
      setReachedPracticesEnd(
        parseInt(headers['x-total-count'], 10) <= practicesData.length + 10
      );
    } catch (err) {
      toast.error("Couldn't load Practices");
    } finally {
      setIsLoadingPractices(false);
    }
  }, [page, practicesData]);

  const loadMorePracticesData = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const expandPodium = useCallback(() => setShowOnlyPodium(false), []);
  const minimizePodium = useCallback(() => setShowOnlyPodium(true), []);

  useEffect(() => {
    fetchPracticesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const practicesIsEmpty = useMemo(() => {
    return practicesData.length === 0;
  }, [practicesData]);

  return (
    <PracticesContext.Provider
      value={{
        reachedPracticesEnd,
        practicesIsEmpty,
        isLoadingPractices,
        practicesData,
        showOnlyPodium,
        expandPodium,
        minimizePodium,
        loadMorePracticesData,
      }}
    >
      {children}
    </PracticesContext.Provider>
  );
};

export const usePractices = (): PracticesContextValues => {
  const context = useContext(PracticesContext);
  if (!context)
    throw new Error('usePractices must be used within a PracticesProvider');

  return context;
};

export default memo(PracticesProvider);
