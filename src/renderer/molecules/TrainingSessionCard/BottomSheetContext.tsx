import React, { createContext, memo, useContext, useState } from 'react';

interface TrainingUnitBottomSheetContextValues {
  isOpen: boolean;
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
}

export const TrainingUnitBottomSheetContext = createContext(
  {} as TrainingUnitBottomSheetContextValues
);

interface ViewUserProps {
  children: React.ReactNode;
}

export const TrainingUnitBottomSheetProvider: React.FC<ViewUserProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openBottomSheet = () => setIsOpen(true);
  const closeBottomSheet = () => setIsOpen(false);

  return (
    <TrainingUnitBottomSheetContext.Provider
      value={{
        isOpen,
        openBottomSheet,
        closeBottomSheet,
      }}
    >
      {children}
    </TrainingUnitBottomSheetContext.Provider>
  );
};

export const useTrainingUnitBottomSheet =
  (): TrainingUnitBottomSheetContextValues => {
    const context = useContext(TrainingUnitBottomSheetContext);
    if (!context)
      throw new Error(
        'useTrainingUnitBottomSheet must be used within a TrainingUnitBottomSheetProvider'
      );

    return context;
  };

export default memo(TrainingUnitBottomSheetProvider);
