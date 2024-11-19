import { IAppAction, IAppContextState } from '@core-interfaces/app/app-state';
import { accountInitialState } from './account/initialState';
import { accountCases } from './account';
import { modalShareCases } from './modal-share';
import { modalShareInitialState } from './modal-share/initalState';


export const appInitialState = {
  ...accountInitialState,
  ...modalShareInitialState,
};

export const appReducer = (state: IAppContextState, action: IAppAction) : IAppContextState => {

  const cases = { 
    ...accountCases,
    ...modalShareCases
  };

  return cases[action.type](state, action.payload as IAppAction['payload'] & never) as IAppContextState;
};