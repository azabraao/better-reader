import { memo } from 'react';
import Component from './Component';
import { TrainingSessionCardProvider } from './Context';

interface TrainingSessionCardProps {
  session: TrainingSession;
}

const TrainingSessionCard = ({ session }: TrainingSessionCardProps) => {
  return (
    <TrainingSessionCardProvider session={session}>
      <Component session={session} />
    </TrainingSessionCardProvider>
  );
};

export default memo(TrainingSessionCard);
