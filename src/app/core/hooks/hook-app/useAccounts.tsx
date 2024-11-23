import { useContext, useEffect } from 'react';
import { AppContext } from '@core-state/app-context/AppContext';
import { getKeySessionStorage, setKeySessionStorage } from '@core-utils/handle-session-client';
import { SESSION_STORAGE_KEYS } from '@core-constants/session-storage';
import { AccountBank } from '@core-interfaces/api/login';
import { getAccountSessionInfo } from '@core-state/app-context/account/actions';
import { AuthContext } from '@core-state/auth-context/AuthContext';

const useAccounts = () => {
  const { state, dispatch } = useContext(AppContext);
  const { state: authState } = useContext(AuthContext);

  // ===> Get account info from session storage
  useEffect(() => {
    const accountInfo = getKeySessionStorage(SESSION_STORAGE_KEYS.ACCOUNT_INFO);
    if(!accountInfo) return;
    
    const accountInfoParsed: AccountBank[] = JSON.parse(accountInfo);
    dispatch(getAccountSessionInfo({ accountInfo: accountInfoParsed }));
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[  ]);

  // ===> Get account info from session storage
  useEffect(() => {
    if(state.bankAccounts && state.bankAccounts.length > 0) {
      setKeySessionStorage(SESSION_STORAGE_KEYS.ACCOUNT_INFO, JSON.stringify(state.bankAccounts));
      return;
    };

  },[ authState.user, state.bankAccounts ]);
};

export default useAccounts;