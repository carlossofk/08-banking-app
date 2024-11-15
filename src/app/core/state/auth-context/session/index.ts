import { ISession } from '@core/interfaces/session';
import { sessionActions, SessionPayloads } from '@core/interfaces/auth/session-reducer';

// ==> Cases State
export const sessionCases = {
  [sessionActions.LOGIN]: (state: ISession, payload: SessionPayloads['LOGIN']): ISession => {
    return {
      ...state,
      user: payload.user,
      token: payload.token,
    };
  },

  [sessionActions.LOGOUT]: (state: ISession): ISession => {
    return {
      ...state,
    };
  },
};