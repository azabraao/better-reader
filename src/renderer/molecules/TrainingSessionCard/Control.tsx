import { memo } from 'react';
import {
  Button,
  Countdown,
  CountdownButton,
  CountdownWaiting,
} from 'renderer/atoms';
import { millisecondsToMinutes } from 'renderer/utils';
import { useTrainingUnitBottomSheet } from './BottomSheetContext';
import { useTrainingSessionCard } from './Context';

const SessionControl = () => {
  const {
    activeTrainingIndex,
    isWaiting,
    trainingIsFinished,
    trainingUnitIsFinished,
    session,
    setIsOnPreCountdown,
    setActiveTrainingIndex,
    setIsWaiting,
    trainingStarted,
    setTrainingStarted,
    setTrainingUnitIsFinished,
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

  if (trainingUnitIsFinished) {
    return (
      <CountdownButton
        onClick={() => {
          setIsOnPreCountdown(true);
          setActiveTrainingIndex(activeTrainingIndex + 1);
          setTrainingUnitIsFinished(false);
        }}
        active={false}
      >
        Começar próxima
      </CountdownButton>
    );
  }

  const minutes = millisecondsToMinutes(
    session.units[activeTrainingIndex]?.duration
  );

  return (
    <Countdown
      minutes={minutes}
      onFinish={() => setIsWaiting(true)}
      onStart={() => !trainingStarted && setTrainingStarted(true)}
    />
  );
};

export default memo(SessionControl);
