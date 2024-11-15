import { createContext, useReducer } from 'react';
import { IAppContext } from '@core-interfaces/app/app-state';
import { appInitialState, appReducer } from './reducer';

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<IAppContext>({
  state: {} as IAppContext['state'] ,
  dispatch: () => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
 
  const [ state, dispatch ] = useReducer(appReducer, appInitialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};