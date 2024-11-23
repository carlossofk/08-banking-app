import { useReducer } from 'react';
import { Mock } from 'vitest';
import { IAppAction, IAppContextState } from '@core-interfaces/app/app-state';
import { appReducer } from '@core-state/app-context/reducer';
import { AppContext } from '@core-state/app-context/AppContext';

export const renderMockAppContext = ({
  stateMock,
  mockDispatch,
}: {
  stateMock: IAppContextState;
  mockDispatch?: Mock;
}) => {
  return ({ children }: { children: React.ReactNode }) => {
    const [ state, realDispatch ] = useReducer(appReducer, stateMock);
    
    const interceptedDispatch = (action: IAppAction) => {
      if (mockDispatch) {
        mockDispatch(action);
      }; 
      realDispatch(action);
    };

    return (
      <AppContext.Provider value={{ state, dispatch: interceptedDispatch }}>
        {children}
      </AppContext.Provider>
    );
  };
};