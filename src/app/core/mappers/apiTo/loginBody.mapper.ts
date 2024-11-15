import { Login } from '@core/interfaces/api/login';

export const loginBodyMapper = (loginData:Login ): Login => {
  return {
    username: loginData.username,
    password: loginData.password,
  };
};