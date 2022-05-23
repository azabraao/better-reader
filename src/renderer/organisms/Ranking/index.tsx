/* eslint-disable react/no-array-index-key */
import {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Section } from 'renderer/atoms';
import { Dropdown } from 'renderer/molecules';
import SquareChecked from 'renderer/assets/icons/white/square-checked.svg';
import SquareUnchecked from 'renderer/assets/icons/white/square.svg';
import { api, ifSpaceBar, techniques, writingDownWords } from 'renderer/utils';
import useLayoutSwitch from 'renderer/contexts/LayoutSwitch/useLayoutSwitch';
import toast from 'react-hot-toast';

import RankingContentLoader from './components/RankingContentLoader';
import RankingContainer from './components/RankingContainer';
import RankingItems from './components/RankingItems';
import RankingLoading from './components/RankingLoading';

type RankingItem = {
  points: number;
  words: number;
  ppm: number;
  date: Date;
  comprehension: number;
  techniques: string[];
};

const Ranking: React.FC<ReactNode> = () => {
  const { isRankingFocused } = useLayoutSwitch();
  const [writingDown, setWritingDown] = useState(true);
  const [isLoadingRanking, setIsLoadingRanking] = useState(false);
  const [rankingData, setRankingData] = useState([] as RankingItem[]);
  const [filterByTechnique, setFilterByTechnique] = useState('All');
  const [hasMoreToShow, setHasMoreToShow] = useState(true);

  const toggleWritingDown = useCallback(
    () => setWritingDown(!writingDown),
    [writingDown]
  );

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

  const filteredRanking = useMemo(() => {
    let ranking = rankingData;

    if (filterByTechnique === 'All') {
      ranking = rankingData;
    }

    if (filterByTechnique !== 'All') {
      ranking = ranking.filter((item) =>
        item.techniques.some((technique) => technique === filterByTechnique)
      );
    }

    if (writingDown) {
      ranking = ranking.filter((item) =>
        item.techniques.some((technique) => technique === writingDownWords)
      );
    }

    if (isRankingFocused) {
      return ranking;
    }

    setHasMoreToShow(ranking.length > 3);

    return ranking.slice(0, 3);
  }, [isRankingFocused, writingDown, rankingData, filterByTechnique]);

  return (
    <Section title="Performance Ranking">
      <div className="mt-2">
        <div className="mb-2 text-white">Technique</div>
      </div>
      <Dropdown items={techniques} onSelected={setFilterByTechnique} />
      <div
        tabIndex={0}
        className="flex items-center mt-2 cursor-pointer"
        onClick={toggleWritingDown}
        onKeyDown={(event) => ifSpaceBar(event, toggleWritingDown)}
        role="button"
      >
        {writingDown ? <SquareChecked /> : <SquareUnchecked />}
        <span className="ml-2 text-white">Writing down words</span>
      </div>
      <RankingContainer>
        {isLoadingRanking ? (
          <RankingLoading />
        ) : (
          <RankingItems items={filteredRanking} />
        )}
      </RankingContainer>

      {!isLoadingRanking && filteredRanking.length !== 0 && hasMoreToShow && (
        <RankingContentLoader />
      )}
    </Section>
  );
};

export default memo(Ranking);
