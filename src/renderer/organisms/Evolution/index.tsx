import { memo } from 'react';
import { Section } from 'renderer/molecules';
import { useRanking } from 'renderer/contexts';
import Chart from './Chart';
import LoadingState from './LoadingState';

const Evolution = () => {
  const { isLoadingRanking } = useRanking();

  return (
    <Section title="Evolution Over Time">
      {isLoadingRanking ? <LoadingState /> : <Chart />}
    </Section>
  );
};

export default memo(Evolution);
