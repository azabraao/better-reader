import { memo } from 'react';
import { TrainingSessionCard } from 'renderer/molecules';

interface ListSessionsProps {
  sessions: TrainingSession[];
}

const ListSessions = ({ sessions }: ListSessionsProps) => {
  return (
    <>
      {sessions.map((session) => (
        <TrainingSessionCard key={session._id} session={session} />
      ))}
    </>
  );
};

export default memo(ListSessions);
