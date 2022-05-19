import React, { createContext, memo, useState } from 'react';

interface LayoutSwitchContextValues {
  isRankingFocused: boolean;
  toggleRankingFocus: () => void;
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
      }}
    >
      {children}
    </LayoutSwitchContext.Provider>
  );
};

export default memo(LayoutSwitchProvider);
