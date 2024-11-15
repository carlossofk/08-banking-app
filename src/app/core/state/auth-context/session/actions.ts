import { SessionActions, SessionPayloads } from '@core/interfaces/auth/session-reducer';


export const loginSession = (payload:SessionPayloads['LOGIN']) => ({
  type: SessionActions.LOGIN,
  payload
});

export const logoutSession = () => ({
  type: SessionActions.LOGOUT,
  payload: undefined
});