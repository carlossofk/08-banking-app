import { Navigate } from 'react-router-dom';
import { useAuth } from '@core-hooks/hook-auth/useAuth';
import { LoginForm } from '@ui/forms/LoginForm';
import { LoginLayout } from '@ui/layouts/LoginLayout';

export const LoginContainer = () => {
  const { user, loginUser, loadinOperations } = useAuth();

  if( user ) {
    return ( 
      <Navigate to="/home" replace /> );
  };

  return (
    <LoginLayout>
      <LoginForm handlerLogin={loginUser} loadSubmit={loadinOperations} />
    </LoginLayout>
  );
};
