import { memo } from 'react';
import Card from './Card';
import TrainingBottomSheet from './BottomSheet';
import { useTrainingUnitBottomSheet } from './BottomSheetContext';

interface TrainingSessionCardProps {
  session: TrainingSession;
}

const TrainingSessionCard = ({ session }: TrainingSessionCardProps) => {
  const { openBottomSheet, closeBottomSheet } = useTrainingUnitBottomSheet();

  return (
    <>
      <Card onClick={openBottomSheet} session={session} />
      <TrainingBottomSheet session={session} close={closeBottomSheet} />
    </>
  );
};

export default memo(TrainingSessionCard);
