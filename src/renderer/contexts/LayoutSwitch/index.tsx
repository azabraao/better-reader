import React, { createContext, memo, useState } from 'react';

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

export const LayoutSwitchProvider: React.FC<ViewUserProps> = ({ children }) => {
  const [isRankingFocused, setIsRankingFocused] = useState(false);

  const toggleRankingFocus = () => setIsRankingFocused(!isRankingFocused);

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

export default memo(LayoutSwitchProvider);
