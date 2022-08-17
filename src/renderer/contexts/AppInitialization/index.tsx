import React, { useContext, createContext, memo, useState } from 'react';

interface AppInitializationContextValues {
  isAppInitialized: boolean;
  registerAppInitialization: () => void;
  setIsAppInitialized: (isAppInitialized: boolean) => void;
}

export const AppInitializationContext = createContext(
  {} as AppInitializationContextValues
);

interface ViewUserProps {
  children: React.ReactNode;
}

const initialized = !!localStorage.getItem('appInitialized');

export const AppInitializationProvider = ({ children }: ViewUserProps) => {
  const [isAppInitialized, setIsAppInitialized] =
    useState<boolean>(initialized);

  const registerAppInitialization = () => {
    if (!isAppInitialized) {
      localStorage.setItem('appInitialized', 'true');
      setIsAppInitialized(true);
    }
  };

  return (
    <AppInitializationContext.Provider
      value={{
        isAppInitialized,
        setIsAppInitialized,
        registerAppInitialization,
      }}
    >
      {children}
    </AppInitializationContext.Provider>
  );
};

export const useAppInitialization = (): AppInitializationContextValues => {
  const context = useContext(AppInitializationContext);
  if (!context)
    throw new Error(
      'useAppInitialization must be used within a AppInitializationProvider'
    );

  return context;
};

export default memo(AppInitializationProvider);
