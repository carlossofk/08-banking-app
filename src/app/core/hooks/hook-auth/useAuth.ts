import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { COOKIES_TYPES } from '@core/constants/cookie';
import { LoginUserService } from '@core-services/auth/loginUser.service';
import { AuthContext } from '@core/state/auth-context/AuthContext';
import { loginSession, logoutSession } from '@core/state/auth-context/session/actions';
import { removeCookie, setCookie } from '@core/utils/handle-cookie';
import { removeKeySessionStorage, setKeySessionStorage } from '@core-utils/handle-session-client';
import { SESSION_STORAGE_KEYS } from '@core-constants/session-storage';

export const useAuth = () => {

  const [ isLoading, setIsLoading ] = useState(false);
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const loginUser = async (userName: string, password: string) => {
    setIsLoading(true);
    const result = await LoginUserService({ userName, password });
    if( !result.ok || !result.data) {
      setIsLoading(true);
      return;
    }

    // ==> Save token in cookie
    const dataLogin= result.data;
   

    // ==> Update state
    dispatch(loginSession({ 
      user: {
        userName: userName,
        role: dataLogin.roles 
      },
      token: dataLogin.token, 
    }));
    
    // ==> Redirect to dashboard
    navigate('/home', { replace: true });
    setIsLoading(false);
  };

  const logoutUser = () => {
    removeKeySessionStorage(SESSION_STORAGE_KEYS.USER);
    removeKeySessionStorage(SESSION_STORAGE_KEYS.TOKEN_API);
    removeCookie(COOKIES_TYPES.TOKEN_API);
    dispatch(logoutSession());
    navigate('/', { replace: true });
  };
  
  // ===> Effect for control session
  useEffect(() => {  
    if(state.user && state.token) {
      setKeySessionStorage(SESSION_STORAGE_KEYS.USER, JSON.stringify(state.user));
      setKeySessionStorage(SESSION_STORAGE_KEYS.TOKEN_API, state.token);
      setCookie(COOKIES_TYPES.TOKEN_API, state.token);
      return;
    }
    
    removeKeySessionStorage(SESSION_STORAGE_KEYS.USER);
    removeKeySessionStorage(SESSION_STORAGE_KEYS.TOKEN_API);
    removeCookie(COOKIES_TYPES.TOKEN_API);
    
  },[ state.token, state.user ]); 

  return {
    user: state.user,
    loginUser,
    logoutUser,
    loadinOperations: isLoading,
  };
};
