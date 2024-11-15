import { Navigate } from 'react-router-dom';
import { useAuth } from '@core-hooks/hook-auth/useAuth';
import { LoginForm } from '@ui/forms/LoginForm';
import { LoginLayout } from '@ui/layouts/LoginLayout';

export const LoginContainer = () => {
  const { user, loginUser } = useAuth();

  if( user ) {
    return ( 
      <Navigate to="/dashboard" replace /> );
  };

  return (
    <LoginLayout>
      <LoginForm handlerLogin={loginUser} />
    </LoginLayout>
  );
};
