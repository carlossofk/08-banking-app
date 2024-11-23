import { useReducer } from 'react';
import { Mock } from 'vitest';
import { IAuthAction, IAuthContextState } from '@core-interfaces/auth/auth-state';
import { authReducer } from '@core-state/auth-context/reducer';
import { AuthContext } from '@core-state/auth-context/AuthContext';

export const renderMockAuthContext = ({
  stateMock,
  mockDispatch,
}: {
  stateMock: IAuthContextState;
  mockDispatch?: Mock;
}) => {
  return ({ children }: { children: React.ReactNode }) => {
    const [ state, realDispatch ] = useReducer(authReducer, stateMock);
    
    const interceptedDispatch = (action: IAuthAction) => {
      if (mockDispatch) {
        mockDispatch(action);
      }; 
      realDispatch(action);
    };

    return (
      <AuthContext.Provider value={{ state, dispatch: interceptedDispatch }}>
        {children}
      </AuthContext.Provider>
    );
  };
};