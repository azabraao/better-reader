import { memo, useMemo } from 'react';
import { Section } from 'renderer/molecules';
import { NoEvolutionData } from 'renderer/atoms/Illustration';
import { useQuery } from '@tanstack/react-query';
import { getPractices } from 'renderer/services';
import Chart from './Chart';
import LoadingState from './LoadingState';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <Section title="Evolution Over Time">{children}</Section>
);

const Evolution = () => {
  const { isLoading, data } = useQuery(
    ['getPracticesEvolution'],
    getPractices,
    {
      initialData: [],
      refetchOnWindowFocus: false,
    }
  );

  const noPractices = useMemo(() => {
    return data.length === 0;
  }, [data]);

  if (noPractices && !isLoading) {
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

  return (
    <Wrapper>{isLoading ? <LoadingState /> : <Chart data={data} />}</Wrapper>
  );
};

export default memo(Evolution);
