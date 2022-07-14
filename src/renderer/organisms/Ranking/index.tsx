/* eslint-disable react/no-array-index-key */
import { memo, useCallback, useMemo, useState } from 'react';
import { Dropdown, Section } from 'renderer/molecules';
import SquareChecked from 'renderer/assets/icons/white/square-checked.svg';
import SquareUnchecked from 'renderer/assets/icons/white/square.svg';
import { ifSpaceBar, techniques, writingDownWords } from 'renderer/utils';
import { useRanking } from 'renderer/contexts';

import RankingContentLoader from './components/RankingContentLoader';
import RankingContainer from './components/RankingContainer';
import RankingItems from './components/RankingItems';
import RankingLoading from './components/RankingLoading';

const Ranking = () => {
  const [writingDown, setWritingDown] = useState(true);
  const { rankingData, isLoadingRanking, showOnlyPodium } = useRanking();
  const [filterByTechnique, setFilterByTechnique] = useState('All');
  const [hasMoreToShow, setHasMoreToShow] = useState(true);

  const toggleWritingDown = useCallback(
    () => setWritingDown(!writingDown),
    [writingDown]
  );

  const filteredRanking = useMemo(() => {
    let ranking = rankingData;

    if (filterByTechnique === 'All') {
      ranking = rankingData;
    }

    if (filterByTechnique !== 'All') {
      ranking = ranking?.filter((item: { techniques: string[] }) =>
        item.techniques.some((technique) => technique === filterByTechnique)
      );
    }

    if (writingDown) {
      ranking = ranking?.filter((item: { techniques: string[] }) =>
        item.techniques.some((technique) => technique === writingDownWords)
      );
    }

    setHasMoreToShow(ranking.length > 3);

    if (showOnlyPodium) {
      return ranking.slice(0, 3);
    }

    return ranking;
  }, [rankingData, filterByTechnique, writingDown, showOnlyPodium]);

  return (
    <Section title="Performance Ranking">
      <div className="my-6 flex gap-4 flex-col">
        <div className="text-white">Technique</div>
        <Dropdown items={techniques} onSelected={setFilterByTechnique} />
        <div
          tabIndex={0}
          className="flex items-center cursor-pointer"
          onClick={toggleWritingDown}
          onKeyDown={(event) => ifSpaceBar(event, toggleWritingDown)}
          role="button"
        >
          {writingDown ? <SquareChecked /> : <SquareUnchecked />}
          <span className="ml-2 text-white">Writing down words</span>
        </div>
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
