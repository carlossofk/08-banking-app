import { IUser } from '@core-interfaces/auth/user';

export enum SessionActions  {
    LOGIN = 'LOGIN',
    LOGOUT= 'LOGOUT',
};
  
export type SessionPayloads  = {
      [SessionActions.LOGIN]: {
        user: IUser;
        token: string;
      };
      
      [SessionActions.LOGOUT]: undefined;
};