import { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useLayoutSwitch } from 'renderer/contexts';
import { Section } from 'renderer/molecules';
import { getTrainingSessions } from 'renderer/services';
import { isDesktop } from 'renderer/utils';
import LoadingState from './LoadingState';
import MobileTrainingSessions from './MobileTrainingSessions';
import ListSessions from './ListSessions';
import SectionActionsIcons from './SectionActionsIcons';

const TrainingSessions = () => {
  const { isRankingFocused } = useLayoutSwitch();

  const { isLoading, data: sessions } = useQuery(
    ['getTrainingSessions'],
    getTrainingSessions,
    {
      initialData: [],
    }
  );

  if (!isDesktop) {
    return <MobileTrainingSessions sessions={sessions} />;
  }

  return (
    <>
      <Section title="Training Sessions" actions={<SectionActionsIcons />}>
        <div
          className={clsx(
            'flex flex-wrap gap-4 no-scrollbar overflow-y-auto md:grid md:grid-cols-3',
            isRankingFocused ? 'lg:grid-cols-2' : 'lg:grid-cols-4'
          )}
        >
          {isLoading ? <LoadingState /> : <ListSessions sessions={sessions} />}
        </div>
      </Section>
    </>
  );
};

export default memo(TrainingSessions);
