import React, {
  createContext,
  memo,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useTrainingUnitBottomSheet } from './BottomSheetContext';

interface TrainingSessionCardContextValues {
  trainingStarted: boolean;
  activeTrainingIndex: number;
  isWaiting: boolean;
  wordsPerPage: number;
  trainingIsFinished: boolean;
  isOnPreCountdown: boolean;
  trainingUnitIsFinished: boolean;
  setTrainingUnitIsFinished: (value: boolean) => void;
  setIsOnPreCountdown: (isOnPreCountdown: boolean) => void;
  setTrainingIsFinished: (value: boolean) => void;
  setWordsPerPage: (wordsPerPage: number) => void;
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

const initialWordsPerPage = localStorage.getItem('wordsPerPage')
  ? Number(localStorage.getItem('wordsPerPage'))
  : 200;

export const TrainingSessionCardProvider: React.FC<ViewUserProps> = ({
  session,
  children,
}) => {
  const [trainingStarted, setTrainingStarted] = useState<boolean>(false);
  const [activeTrainingIndex, setActiveTrainingIndex] = useState<number>(-1);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [wordsPerPage, setWordsPerPage] = useState<number>(initialWordsPerPage);
  const [trainingIsFinished, setTrainingIsFinished] = useState<boolean>(false);
  const [isOnPreCountdown, setIsOnPreCountdown] = useState<boolean>(false);
  const [trainingUnitIsFinished, setTrainingUnitIsFinished] =
    useState<boolean>(false);

  const { isOpen } = useTrainingUnitBottomSheet();

  useEffect(() => {
    if (!isOpen) {
      setTrainingStarted(false);
      setActiveTrainingIndex(0);
      setIsWaiting(false);
      setIsOnPreCountdown(false);
      setTrainingIsFinished(false);
      setTrainingUnitIsFinished(false);
    }
  }, [isOpen]);

  return (
    <TrainingSessionCardContext.Provider
      value={{
        session,
        trainingStarted,
        activeTrainingIndex,
        isWaiting,
        wordsPerPage,
        trainingIsFinished,
        isOnPreCountdown,
        setTrainingUnitIsFinished,
        setIsOnPreCountdown,
        setTrainingIsFinished,
        trainingUnitIsFinished,
        setWordsPerPage,
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
