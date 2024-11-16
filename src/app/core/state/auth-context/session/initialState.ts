import { SESSION_STORAGE_KEYS } from '@core-constants/session-storage';
import { ISession } from '@core-interfaces/auth/session';
import { getKeySessionStorage } from '@core-utils/handle-session-client';

const getStateSessionStorage = () => {
  const user = getKeySessionStorage(SESSION_STORAGE_KEYS.USER);
  const token = getKeySessionStorage(SESSION_STORAGE_KEYS.TOKEN_API);

  return{
    user: user ? JSON.parse(user) : null,
    token: token || null,
  };
};

export const sessionInitialState: ISession = getStateSessionStorage();
