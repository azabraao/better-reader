import React, {
  useContext,
  createContext,
  memo,
  useState,
  useCallback,
} from 'react';

interface LayoutSwitchContextValues {
  isRankingFocused: boolean;
  toggleRankingFocus: () => void;
  setIsRankingFocused: (isRankingFocused: boolean) => void;
}

export const LayoutSwitchContext = createContext(
  {} as LayoutSwitchContextValues
);

interface ViewUserProps {
  children: React.ReactNode;
}

export const LayoutSwitchProvider = ({ children }: ViewUserProps) => {
  const [isRankingFocused, setIsRankingFocused] = useState<boolean>(false);

  const toggleRankingFocus = useCallback(
    () => setIsRankingFocused(!isRankingFocused),
    [isRankingFocused]
  );

  return (
    <LayoutSwitchContext.Provider
      value={{
        isRankingFocused,
        toggleRankingFocus,
        setIsRankingFocused,
      }}
    >
      {children}
    </LayoutSwitchContext.Provider>
  );
};

export const useLayoutSwitch = (): LayoutSwitchContextValues => {
  const context = useContext(LayoutSwitchContext);
  if (!context)
    throw new Error(
      'useLayoutSwitch must be used within a LayoutSwitchProvider'
    );

  return context;
};

export default memo(LayoutSwitchProvider);
