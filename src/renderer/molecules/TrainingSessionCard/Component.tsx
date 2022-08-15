import { memo, useCallback, useState } from 'react';
import Card from './Card';
import TrainingBottomSheet from './BottomSheet';

interface TrainingSessionCardProps {
  session: TrainingSession;
}

const TrainingSessionCard = ({ session }: TrainingSessionCardProps) => {
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false);

  const onClick = useCallback(() => {
    setOpenBottomSheet(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card onClick={onClick} session={session} />
      <TrainingBottomSheet
        session={session}
        isOpen={openBottomSheet}
        close={() => setOpenBottomSheet(false)}
      />
    </>
  );
};

export default memo(TrainingSessionCard);
