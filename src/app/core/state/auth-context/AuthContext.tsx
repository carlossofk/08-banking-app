import { createContext, useReducer } from 'react';
import { IAuthContext } from '@core/interfaces/auth/auth-state';
import { authInitialState, authReducer } from './reducer';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<IAuthContext>({
  state: {} as IAuthContext['state'] ,
  dispatch: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
 
  const [ state, dispatch ] = useReducer(authReducer, authInitialState);
  
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
