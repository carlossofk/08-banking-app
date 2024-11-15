import { IUser } from '@core-interfaces/shared/user';

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