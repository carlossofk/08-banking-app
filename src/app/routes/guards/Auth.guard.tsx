import {  useMemo } from 'react';
import {  Navigate } from 'react-router-dom';

import { COOKIES_TYPES } from '@core-constants/cookie';
import { useAuth } from '@core-hooks/hook-auth/useAuth';
import { RolUser } from '@core-interfaces/shared/user';
import { getCookie } from '@core-utils/handle-cookie';

interface Props {
  children: React.ReactNode;
  rolAccepted?: RolUser[]
}

export const AuthGuard = ({ children, rolAccepted }: Props) => {

  const {  user } = useAuth();
  const userRols = user?.role;
  
  const token = useMemo(() => getCookie(COOKIES_TYPES.TOKEN_API), []);

  const hasAccess = userRols?.some((role) => rolAccepted?.includes(role));

  // ==> Check if we have a session
  if( !token )      return ( <Navigate to="/" replace />);
  if( !hasAccess && rolAccepted && rolAccepted?.length > 0 )  return ( <Navigate to="/" replace /> );

  return <>{children}</>;
};
