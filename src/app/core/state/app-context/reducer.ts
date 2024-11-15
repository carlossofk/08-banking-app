import { IAppAction, IAppContextState } from '@core-interfaces/app/app-state';
import { accountInitialState } from './account/initialState';
import { accountCases } from './account';


export const appInitialState = {
  ...accountInitialState
};

export const appReducer = (state: IAppContextState, action: IAppAction) : IAppContextState => {

  const cases = { 
    ...accountCases
  };

  return cases[action.type](state, action.payload as IAppAction['payload'] & never);
};