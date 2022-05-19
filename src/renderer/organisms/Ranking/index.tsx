/* eslint-disable react/no-array-index-key */
import { memo, ReactNode, useCallback, useMemo, useState } from 'react';
import { Section } from 'renderer/atoms';
import { Dropdown } from 'renderer/molecules';
import SquareChecked from 'renderer/assets/icons/white/square-checked.svg';
import SquareUnchecked from 'renderer/assets/icons/white/square.svg';
import { ifSpaceBar } from 'renderer/utils';
import ArrowRight from 'renderer/assets/icons/muted/arrow-right.svg';
import ArrowTop from 'renderer/assets/icons/muted/arrow-top.svg';
import ArrowDown from 'renderer/assets/icons/muted/arrow-down.svg';
import useLayoutSwitch from 'renderer/contexts/LayoutSwitch/useLayoutSwitch';

import { readingMock } from './data';

interface RankingItemProps {
  position: number;
  points: number;
  words?: number;
  ppm: number;
  date: Date;
  comprehension: number;
}

const RankingContainer = ({ children }: { children: ReactNode }) => (
  <div className="pt-4">{children}</div>
);

const RankingItem = ({
  position,
  points,
  words,
  ppm,
  date,
  comprehension,
}: RankingItemProps) => (
  <div className="flex gap-x-6 rounded-lg border-muted border-1 mb-2 items-stretch p-2">
    <div className="flex items-center">
      <span className="text-white font-medium mr-6">#{position}</span>
    </div>
    <div className="flex flex-col mr-6">
      <span className="text-white font-medium mb-1">{points}pts</span>
      <span className="text-muted font-medium text-xs">{words} words</span>
    </div>
    <div className="flex flex-col">
      <span className="text-white font-medium mb-1">{ppm}ppm</span>
      <span className="text-muted font-medium text-xs">
        in{' '}
        {new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </span>
    </div>
    <div className="flex flex-col justify-end">
      <span className="text-muted font-medium text-xs">
        %{comprehension} comprehension
      </span>
    </div>
  </div>
);

RankingItem.defaultProps = {
  words: 0,
};

interface RankingContentLoaderProps {
  isShowingAll: boolean;
  toggleSeeAllRanking: () => void;
}

const RankingContentLoader = ({
  isShowingAll,
  toggleSeeAllRanking,
}: RankingContentLoaderProps) => {
  if (isShowingAll) {
    return (
      <div className="flex justify-between p-2">
        <button
          type="button"
          className="flex flex-row items-center justify-center cursor-pointer"
          onClick={toggleSeeAllRanking}
        >
          <span className="text-muted font-medium mr-2">See less</span>
          <ArrowTop />
        </button>
        <div className="flex flex-row items-center justify-center cursor-pointer">
          <span className="text-muted font-medium mr-2">Load more</span>
          <ArrowDown />
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="p-2 flex cursor-pointer"
      onClick={toggleSeeAllRanking}
    >
      <span className="text-muted mr-2">See All</span>
      <ArrowRight />
    </button>
  );
};

const Ranking: React.FC<ReactNode> = () => {
  const { toggleRankingFocus, isRankingFocused } = useLayoutSwitch();

  const [writingDown, setWritingDown] = useState(true);

  const toggleWritingDown = useCallback(
    () => setWritingDown(!writingDown),
    [writingDown]
  );

  const toggleShowAllRanking = useCallback(
    () => toggleRankingFocus(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isRankingFocused]
  );

  const filteredRanking = useMemo(() => {
    let ranking = readingMock;
    if (writingDown) {
      ranking = ranking.filter(({ words }) => !!words);
    }

    if (isRankingFocused) {
      return ranking;
    }

    return ranking.slice(0, 3);
  }, [isRankingFocused, writingDown]);

  return (
    <Section title="Performance Ranking">
      <div className="mt-2">
        <div className="mb-2 text-white">Technique</div>
      </div>
      <Dropdown items={['a']} />
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
        {filteredRanking.map((item, index) => (
          <RankingItem
            key={index}
            position={index + 1}
            points={item.points}
            words={item.words}
            ppm={item.ppm}
            date={item.date}
            comprehension={item.comprehension}
          />
        ))}
      </RankingContainer>
      <RankingContentLoader
        isShowingAll={isRankingFocused}
        toggleSeeAllRanking={toggleShowAllRanking}
      />
    </Section>
  );
};

export default memo(Ranking);
