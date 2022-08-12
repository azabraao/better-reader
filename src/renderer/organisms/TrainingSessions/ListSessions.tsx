import { memo } from 'react';
import SessionCard from './SessionCard';

interface ListSessionsProps {
  sessions: TrainingSession[];
}

const ListSessions = ({ sessions }: ListSessionsProps) => {
  return (
    <>
      {sessions.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}
    </>
  );
};

export default memo(ListSessions);
