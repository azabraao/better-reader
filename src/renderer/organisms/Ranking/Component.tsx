/* eslint-disable react/no-array-index-key */
import { memo, useCallback, useMemo, useState } from 'react';
import { Dropdown, Section } from 'renderer/molecules';
import Icon, { SquareChecked, SquareUnchecked } from 'renderer/atoms/Icon';
import { ifSpaceBar, techniques } from 'renderer/utils';
import { useRanking } from 'renderer/contexts';
import { NoRankingData } from 'renderer/atoms/Illustration';

import RankingContentLoader from './components/RankingContentLoader';
import RankingContainer from './components/RankingContainer';
import RankingItems from './components/RankingItems';
import RankingLoading from './components/RankingLoading';

const dropDownItems = [
  { label: 'Tudo', value: '' },
  ...techniques.map((item) => ({
    ...item,
    icon: <Icon name={item.value as Icon} />,
  })),
];

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <Section title="Ranking de performance">{children}</Section>
);

const Ranking = () => {
  const [writingDown, setWritingDown] = useState(true);
  const { rankingData, isLoadingRanking, showOnlyPodium, rankingIsEmpty } =
    useRanking();
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
        item.techniques.some((technique) => technique === 'writing')
      );
    }

    setHasMoreToShow(ranking.length > 3);

    if (showOnlyPodium) {
      return ranking.slice(0, 3);
    }

    return ranking;
  }, [rankingData, filterByTechnique, writingDown, showOnlyPodium]);

  if (rankingIsEmpty) {
    return (
      <Wrapper>
        <div className="w-full flex flex-col items-center justify-center py-12 px-14 gap-6 lg:items-start lg:pl-6">
          <div className="max-w-min flex flex-col items-center justify-center gap-6">
            <NoRankingData />
            <span className="text-base text-white text-center w-full block">
              Sem treinos para ranquear
            </span>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="my-6 flex gap-4 flex-col">
        <div className="text-white">Técnica</div>
        <Dropdown items={dropDownItems} onSelected={setFilterByTechnique} />
        <div
          tabIndex={0}
          className="flex items-center cursor-pointer text-white"
          onClick={toggleWritingDown}
          onKeyDown={(event) => ifSpaceBar(event, toggleWritingDown)}
          role="button"
        >
          {writingDown ? <SquareChecked /> : <SquareUnchecked />}
          <span className="ml-2">Anotando palavras</span>
        </div>
      </div>
      <RankingContainer>
        {isLoadingRanking && rankingIsEmpty ? (
          <RankingLoading count={3} />
        ) : (
          <RankingItems items={filteredRanking} />
        )}
      </RankingContainer>

      {!isLoadingRanking && filteredRanking.length !== 0 && hasMoreToShow && (
        <RankingContentLoader />
      )}
    </Wrapper>
  );
};

export default memo(Ranking);
