import { SESSION_STORAGE_KEYS } from '@core-constants/session-storage';
import { IAccountInfo } from '@core-interfaces/shared/account';
import { getKeySessionStorage } from '@core-utils/handle-session-client';

const getStateSessionStorage = () :IAccountInfo=> {
  const accountInfo = getKeySessionStorage(SESSION_STORAGE_KEYS.ACCOUNT_INFO);

  return accountInfo 
    ? JSON.parse(accountInfo) 
    : {};
};

export const accountInitialState: IAccountInfo = getStateSessionStorage();