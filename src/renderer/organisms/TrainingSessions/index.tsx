import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { memo, useMemo } from 'react';
import Icon, { Plus, Speed } from 'renderer/atoms/Icon';
import { useLayoutSwitch } from 'renderer/contexts';
import { Section } from 'renderer/molecules';
import getTrainingSessions from 'renderer/services/getTrainingSessions';
import LoadingState from './LoadingState';

const TrainingSessions = () => {
  const { isRankingFocused } = useLayoutSwitch();

  const { isLoading, data } = useQuery(
    ['trainingSessions'],
    getTrainingSessions,
    {
      initialData: [],
    }
  );

  const sessions = useMemo(() => {
    return data.map((session) => {
      const techniques: string[] = [];
      let target = 0;

      session.units.forEach((unit) => {
        if (unit.target > target) target = unit.target;

        unit.techniques.forEach((technique) => {
          if (!techniques.includes(technique)) techniques.push(technique);
        });
      });
      return {
        ...session,
        techniques,
        target,
      };
    });
  }, [data]);

  return (
    <Section title="Training Sessions" actions={<Plus />}>
      <div
        className={clsx(
          'flex flex-wrap gap-4 no-scrollbar overflow-y-auto md:grid md:grid-cols-3',
          isRankingFocused ? 'lg:grid-cols-2' : 'lg:grid-cols-4'
        )}
      >
        {isLoading ? (
          <LoadingState />
        ) : (
          sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center gap-4 border-white border-1 rounded-lg w-full xs:max-w-[calc(50vw-27px)]"
            >
              <div className="flex flex-col gap-2 text-white p-2">
                <span className="font-medium whitespace-nowrap">
                  {session.name}
                </span>
                <div className="flex gap-2 items-center">
                  {session.techniques.map((technique) => (
                    <Icon key={session.id + Math.random()} name={technique} />
                  ))}
                  <div className="ml-1 flex gap-2 items-center">
                    <Speed />
                    {session.target}ppm
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Section>
  );
};

export default memo(TrainingSessions);
