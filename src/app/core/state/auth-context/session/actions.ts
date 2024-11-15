import { sessionActions, SessionPayloads } from '@core/interfaces/auth/session-reducer';


export const loginSession = (payload:SessionPayloads['LOGIN']) => ({
  type: sessionActions.LOGIN,
  payload
});