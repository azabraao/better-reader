import { memo } from 'react';
import { Countdown, CountdownWaiting } from 'renderer/atoms';
import { useTrainingSessionCard } from './Context';

const SessionControl = () => {
  const {
    activeTrainingIndex,
    isWaiting,
    session,
    setIsWaiting,
    trainingStarted,
    setTrainingStarted,
  } = useTrainingSessionCard();
  console.log('isWaiting>>>', isWaiting);

  return (
    <>
      {isWaiting ? (
        <CountdownWaiting />
      ) : (
        <Countdown
          minutes={session.units[activeTrainingIndex]?.duration}
          onFinish={() => setIsWaiting(true)}
          onStart={() => !trainingStarted && setTrainingStarted(true)}
        />
      )}
    </>
  );
};

export default memo(SessionControl);
