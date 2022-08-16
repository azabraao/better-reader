import { memo } from 'react';
import { Button, Countdown, CountdownWaiting } from 'renderer/atoms';
import { useTrainingUnitBottomSheet } from './BottomSheetContext';
import { useTrainingSessionCard } from './Context';

const SessionControl = () => {
  const {
    activeTrainingIndex,
    isWaiting,
    trainingIsFinished,
    session,
    setIsWaiting,
    trainingStarted,
    setTrainingStarted,
  } = useTrainingSessionCard();

  const { closeBottomSheet, isOpen: trainingBottomSheetIsOpen } =
    useTrainingUnitBottomSheet();

  if (!trainingBottomSheetIsOpen) return null;

  if (isWaiting) return <CountdownWaiting />;

  if (trainingIsFinished) {
    return (
      <div className="py-6">
        <Button fullWidth onClick={closeBottomSheet} size="sm">
          Close training
        </Button>
      </div>
    );
  }

  return (
    <Countdown
      minutes={session.units[activeTrainingIndex]?.duration}
      onFinish={() => setIsWaiting(true)}
      started={activeTrainingIndex > 0}
      onStart={() => !trainingStarted && setTrainingStarted(true)}
    />
  );
};

export default memo(SessionControl);
