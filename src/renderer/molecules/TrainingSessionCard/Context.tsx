import React, { createContext, memo, useContext, useState } from 'react';

interface TrainingSessionCardContextValues {
  trainingStarted: boolean;
  activeTrainingIndex: number;
  isWaiting: boolean;
  setTrainingStarted: (trainingStarted: boolean) => void;
  setActiveTrainingIndex: (activeTrainingIndex: number) => void;
  setIsWaiting: (isWaiting: boolean) => void;
  session: TrainingSession;
}

export const TrainingSessionCardContext = createContext(
  {} as TrainingSessionCardContextValues
);

interface ViewUserProps {
  children: React.ReactNode;
  session: TrainingSession;
}

export const TrainingSessionCardProvider: React.FC<ViewUserProps> = ({
  session,
  children,
}) => {
  const [trainingStarted, setTrainingStarted] = useState<boolean>(false);
  const [activeTrainingIndex, setActiveTrainingIndex] = useState<number>(0);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);

  return (
    <TrainingSessionCardContext.Provider
      value={{
        session,
        trainingStarted,
        activeTrainingIndex,
        isWaiting,
        setTrainingStarted,
        setActiveTrainingIndex,
        setIsWaiting,
      }}
    >
      {children}
    </TrainingSessionCardContext.Provider>
  );
};

export const useTrainingSessionCard = (): TrainingSessionCardContextValues => {
  const context = useContext(TrainingSessionCardContext);
  if (!context)
    throw new Error(
      'useTrainingSessionCard must be used within a TrainingSessionCardProvider'
    );

  return context;
};

export default memo(TrainingSessionCardProvider);
