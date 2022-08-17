import { memo } from 'react';
import { Section } from 'renderer/molecules';
import { useRanking } from 'renderer/contexts';
import { NoEvolutionData } from 'renderer/atoms/Illustration';
import Chart from './Chart';
import LoadingState from './LoadingState';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <Section title="Evolution Over Time">{children}</Section>
);

const Evolution = () => {
  const { isLoadingRanking, rankingIsEmpty } = useRanking();

  if (rankingIsEmpty) {
    return (
      <Wrapper>
        <div className="w-full flex flex-col items-center justify-center py-12 px-14 gap-6 lg:items-start lg:pl-6">
          <div className="max-w-min flex flex-col items-center justify-center gap-6">
            <NoEvolutionData />
            <span className="text-base text-white text-center w-full block">
              Start training to begin tracking your progress!
            </span>
          </div>
        </div>
      </Wrapper>
    );
  }

  return <Wrapper>{isLoadingRanking ? <LoadingState /> : <Chart />}</Wrapper>;
};

export default memo(Evolution);
