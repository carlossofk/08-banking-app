import { ISession } from '@core-interfaces/shared/session';
import { SessionActions, SessionPayloads } from '@core/interfaces/auth/session-reducer';

// ==> Cases State
export const sessionCases = {
  [SessionActions.LOGIN]: (state: ISession, payload: SessionPayloads['LOGIN']): ISession => {
    return {
      ...state,
      user: payload.user,
      token: payload.token,
    };
  },

  [SessionActions.LOGOUT]: (state: ISession): ISession => {
    return {
      ...state,
      user: null,
      token: null,
    };
  },
};