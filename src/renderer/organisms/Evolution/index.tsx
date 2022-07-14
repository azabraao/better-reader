import { memo, ReactNode } from 'react';
import { Section } from 'renderer/molecules';
import useRanking from 'renderer/contexts/Ranking/useRanking';
import Chart from './Chart';
import LoadingState from './LoadingState';

const Evolution: React.FC<ReactNode> = () => {
  const { isLoadingRanking } = useRanking();

  return (
    <Section title="Evolution Over Time">
      {isLoadingRanking ? <LoadingState /> : <Chart />}
    </Section>
  );
};

export default memo(Evolution);
