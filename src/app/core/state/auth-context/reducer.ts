import { IAuthAction, IAuthContextState } from '@core/interfaces/auth/auth-state';

import { sessionCases } from './session';
import { sessionInitialState } from './session/initialState';

export const authInitialState = {
  ...sessionInitialState
};

export const authReducer = (state: IAuthContextState, action: IAuthAction) : IAuthContextState => {

  const cases = { 
    ...sessionCases
  };

  return cases[action.type](state, action.payload as IAuthAction['payload'] & never);
};