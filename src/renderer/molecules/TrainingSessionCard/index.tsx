import { memo } from 'react';
import { TrainingUnitBottomSheetProvider } from './BottomSheetContext';
import Component from './Component';
import { TrainingSessionCardProvider } from './Context';

interface TrainingSessionCardProps {
  session: TrainingSession;
}

const TrainingSessionCard = ({ session }: TrainingSessionCardProps) => {
  return (
    <TrainingUnitBottomSheetProvider>
      <TrainingSessionCardProvider session={session}>
        <Component session={session} />
      </TrainingSessionCardProvider>
    </TrainingUnitBottomSheetProvider>
  );
};

export default memo(TrainingSessionCard);
